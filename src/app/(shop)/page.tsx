// app/page.tsx

import { getProductos } from "@/actions/product/get-all-products";
import { getAllShops } from "@/actions/shop/get-all-shops";
import {
  ProductSlideShow,
  StoreSlideShow,
  CategorySlideShow,
} from "@/components";
import { BannerSlide } from "./ui/BannerSlide";
import { getAllCategories } from "@/actions";
import Link from "next/link";

export default async function Home() {
  const [productos, tiendas, categories] = await Promise.all([
    getProductos(),
    getAllShops(),
    getAllCategories(),
  ]);

  return (
    <>
      <BannerSlide />

      <section className="px-4 sm:px-8 lg:px-24 py-8 relative">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-8">
          <h2 className="text-3xl font-bold">Lista de Productos</h2>
          <Link href="/productos" className="text-md md:text-sm text-[#093F51]">
            Ver todos los productos →
          </Link>
        </div>
        <ProductSlideShow productos={productos} />
      </section>
      <section className="px-4 sm:px-8 lg:px-24 py-8 relative">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Lista de Categorías
          </h2>
          <Link
            href="/categorias"
            className="text-sm md:text-sm text-[#093F51]"
          >
            Ver todas las categorías →
          </Link>
        </div>
        <CategorySlideShow categorias={categories} />
      </section>
      <section className="px-4 sm:px-8 lg:px-24 py-8 relative">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Tiendas Oficiales</h2>
          <Link href="/tiendas" className="text-sm md:text-sm text-[#093F51]">
            Ver todas las tiendas →
          </Link>
        </div>
        <StoreSlideShow tiendas={tiendas} />
      </section>
    </>
  );
}
