import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function CartPage() {
  return (
    <div className="px-4 md:px-36 mt-10 mb-28">
      <h1 className="text-3xl font-bold">Carrito</h1>
      <Link
        href="/"
        className="text-sm text-[#0F766E] mt-2 mb-6 inline-block hover:underline"
      >
        Agregar más productos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de productos */}
        <div className="lg:col-span-2">
          <ProductsInCart />
        </div>

        {/* Resumen del carrito */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Resumen del Carrito</h2>

          <OrderSummary />

          <Link
            href="/checkout"
            className="block w-full bg-[#093F51] text-white py-2 rounded mt-5 text-sm text-center"
          >
            Checkout
          </Link>

          <p className="text-[11px] text-gray-600 mt-4">
            ⚠️ Importante: Por ahora, los productos se recogen únicamente en la
            Universidad Cooperativa de Colombia – Montería. No realizamos
            envíos.
          </p>
        </div>
      </div>
    </div>
  );
}
