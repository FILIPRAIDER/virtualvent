import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import { OrderClient } from "./ui/OrderClient";
import { getOrderWithClientByUuid } from "@/actions/cliente/getOrderWithClientByuuid";

interface Props {
  params: Promise<{ uuid: string }>;
}

export default async function OrderPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const { uuid } = await params;

  const { ok, order } = await getOrderWithClientByUuid(uuid);
  if (!ok || !order || !order.user?.clientes) redirect("/");

  const plainOrder = {
    uuid: order.uuid,
    total: order.total.toString(),
    pagado: order.pagado,
    num_items: order.num_items,
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
      <OrderClient plainOrder={plainOrder} />
    </div>
  );
}
