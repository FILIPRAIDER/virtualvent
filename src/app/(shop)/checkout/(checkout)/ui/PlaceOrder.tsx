// src/components/ui/PlaceOrder.tsx
"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { placeOrder } from "@/actions";
import { getClienteByUserId } from "@/actions/cliente/get-cliente-by-user-id";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useShallow } from "zustand/react/shallow";
import { Cliente } from "@/interfaces";

export const PlaceOrder = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [cliente, setCliente] = useState<Cliente | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessagge, setErrorMessagge] = useState("");

  const { total, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
    getClienteByUserId().then((data) => {
      if (!data) return;

      const clienteTransformado: Cliente = {
        id: data.id.toString(),
        uuid: data.uuid,
        primer_nombre: data.primer_nombre,
        segundo_nombre: data.segundo_nombre ?? undefined,
        primer_apellido: data.primer_apellido,
        segundo_apellido: data.segundo_apellido ?? undefined,
        tipo_documento: data.tipo_documento,
        numero_documento: data.numero_documento,
        telefono: data.telefono,
        sexo: data.sexo,
        fecha_nacimiento: data.fecha_nacimiento.toISOString(),
      };

      setCliente(clienteTransformado);
    });
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((p) => ({
      productId: p.uuid,
      quantity: p.quantity,
    }));

    const resp = await placeOrder(productsToOrder);

    if (!resp.ok || !resp.order) {
      setErrorMessagge(resp.message ?? "Ocurrió un error inesperado");
      setIsPlacingOrder(false);
      return;
    }

    clearCart();
    router.replace("/ordenes/" + resp.order.uuid);
  };

  if (!loaded) return <p>Cargando...</p>;

  return (
    <div className="bg-white rounded-xl  p-7 h-fit w-full max-w-[400px]">
      <h2 className="text-lg mb-2 font-semibold">Resumen del Carrito</h2>

      <div className="grid grid-cols-2 text-sm">
        <span>Nº Productos</span>
        <span className="text-right">{itemsInCart}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(total)}</span>

        <hr className="col-span-2 my-2" />

        <span className="font-bold">Total</span>
        <span className="font-bold text-right">{currencyFormat(total)}</span>
      </div>

      <p className="text-[11px] text-gray-600 mt-4">
        ⚠️ Importante: los productos se recogen únicamente en la Universidad
        Cooperativa de Colombia – Montería. No realizamos envíos.
      </p>

      <div className="mt-5 mb-2">
        <button
          onClick={onPlaceOrder}
          className={clsx(
            "w-full py-2 rounded text-white text-sm cursor-pointer",
            isPlacingOrder ? "bg-gray-400 cursor-not-allowed" : "bg-[#093F51]"
          )}
          disabled={isPlacingOrder}
        >
          Confirmar compra
        </button>
        {errorMessagge && (
          <p className="text-red-500 mt-2 text-sm">{errorMessagge}</p>
        )}
      </div>

      <div className="text-sm mt-6 space-y-1">
        <h3 className="font-semibold mb-1">Datos del cliente</h3>
        <p>
          <strong>Nombre completo:</strong>{" "}
          {cliente
            ? `${cliente.primer_nombre} ${cliente.segundo_nombre ?? ""} ${
                cliente.primer_apellido
              } ${cliente.segundo_apellido ?? ""}`
            : "Cargando..."}
        </p>
        <p>
          <strong>Documento:</strong>{" "}
          {cliente?.numero_documento ?? "Cargando..."}
        </p>
        <p>
          <strong>Teléfono:</strong> {cliente?.telefono ?? "Cargando..."}
        </p>
        <p>
          <strong>Correo:</strong> {session?.user?.email}
        </p>
      </div>
    </div>
  );
};
