import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import Image from "next/image";
import { currencyFormat } from "@/utils";

import { getOrderWithClientByUuid } from "@/actions/cliente/getOrderWithClientByuuid";

import PagoWrapper from "./PagoWrapper";

interface Props {
  params: Promise<{ uuid: string }>;
}

async function getBancosPSE() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_EPAYCO_API_URL;
    const res = await fetch(`${baseUrl}/bancos`);

    if (!res.ok) throw new Error("Error al cargar bancos");

    const data = await res.json();
    return Array.isArray(data.bancos) ? data.bancos : [];
  } catch {
    return []; // fallback en caso de error
  }
}

export default async function OrderPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const { uuid } = await params;

  const [{ ok, order }, bancos] = await Promise.all([
    getOrderWithClientByUuid(uuid),
    getBancosPSE(),
  ]);

  if (!ok || !order || !order.user.clientes) redirect("/");

  const plainOrder = {
    uuid: order.uuid,
    total: order.total.toString(),
    pagado: order.pagado,
    user: {
      email: order.user.email,
      clientes: {
        primer_nombre: order.user.clientes.primer_nombre,
        primer_apellido: order.user.clientes.primer_apellido,
        numero_documento: order.user.clientes.numero_documento,
        telefono: order.user.clientes.telefono,
      },
    },
  };

  return (
    <div className="flex justify-center px-6 py-10 h-screen">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Resumen de la Orden</h1>

        <div className="grid sm:grid-cols-2 gap-10">
          {/* Tabla de productos */}
          <div>
            <table className="w-full text-sm">
              <thead className="border-b border-gray-300">
                <tr>
                  <th className="text-left py-2">Producto</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.item_orden.map((item) => (
                  <tr key={item.uuid} className="border-b border-gray-300">
                    <td className="flex items-center gap-3 py-3">
                      <Image
                        src={
                          item.productos.imagenes[0]?.imagen ??
                          "/imgs/default-product.png"
                        }
                        alt={item.productos.nombre}
                        width={50}
                        height={50}
                        className="object-cover rounded"
                      />
                      <span>{item.productos.nombre}</span>
                    </td>
                    <td className="text-center">{item.cantidad}</td>
                    <td className="text-right pr-2">
                      {currencyFormat(Number(item.precio) * item.cantidad)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resumen + banco + botón */}
          <div className="bg-white rounded shadow p-6 text-sm w-full">
            <h2 className="text-lg font-semibold mb-2">Resumen del Carrito</h2>
            <div className="grid grid-cols-2 gap-y-1">
              <span>Nº Productos</span>
              <span className="text-right">{order.num_items}</span>

              <span>Total</span>
              <span className="text-right font-bold">
                {currencyFormat(Number(order.total))}
              </span>
            </div>

            <p className="text-xs text-gray-600 mt-4">
              ⚠️ Recoge tu pedido en la Universidad Cooperativa de Colombia –
              Montería.
            </p>

            <div className="mt-6">
              <span
                className={`px-2 py-1 text-xs rounded font-semibold ${
                  order.pagado
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.pagado ? "Pagado" : "Pendiente"}
              </span>
            </div>

            {!order.pagado && (
              <PagoWrapper order={plainOrder} bancos={bancos} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
