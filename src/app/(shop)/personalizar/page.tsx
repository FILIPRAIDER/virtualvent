import { getProductosSinCanasta } from "@/actions/product/get-productos-sin-canasta";
import { PersonalizaAncheta } from "@/components";

export const revalidate = 3600;

export default async function PersonalizarPage() {
  const productos = await getProductosSinCanasta();

  return (
    <div className="px-4 md:px-36 mt-10 mb-28">
      <h1 className="text-3xl font-bold">Personaliza tu ancheta</h1>
      <p className="text-sm text-gray-600 mt-1 mb-6">
        Elige productos y arma tu ancheta. Monto mínimo: $50.000
      </p>

      <PersonalizaAncheta productos={productos} />
    </div>
  );
}
