import { getOrdersByUser } from "@/actions";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser();
  if (!ok) return null;

  return (
    <div className="p-6 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Órdenes</h1>
        <Link href="/" className="flex items-center text-[#093F51] my-4 px-3 ">
          <IoArrowBack size={24} className="mr-2" /> Volver atrás
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm rounded overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">#UUID</th>
              <th className="px-4 py-3 whitespace-nowrap">Items</th>
              <th className="px-4 py-3 whitespace-nowrap">Total</th>
              <th className="px-4 py-3 whitespace-nowrap">Estado</th>
              <th className="px-4 py-3 whitespace-nowrap">Ver</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.uuid}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-mono text-gray-600 whitespace-nowrap">
                  {order.uuid.slice(0, 8)}...
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {order.num_items}
                </td>
                <td className="px-4 py-3 font-semibold whitespace-nowrap">
                  ${order.total.toString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded font-semibold ${
                      order.pagado
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.pagado ? "Pagado" : "Pendiente"}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link
                    href={`/ordenes/${order.uuid}`}
                    className="text-blue-600 underline"
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
