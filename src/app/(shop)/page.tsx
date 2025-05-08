// app/page.tsx

import { getProductos } from "@/actions/product/get-all-products";
import { getAllShops } from "@/actions/shop/get-all-shops";
import {
  ProductSlideShow,
  StoreSlideShow,
  CategorySlideShow,
} from "@/components";
import { BannerSlide } from "./ui/BannerSlide";

export default async function Home() {
  const [productos, tiendas] = await Promise.all([
    getProductos(),
    getAllShops(),
  ]);

  return (
    <>
      <BannerSlide />

      <section className="px-4 sm:px-8 lg:px-24 py-8 relative">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-8">
          <h2 className="text-3xl font-bold">Lista de Productos</h2>
          <a href="/productos" className="text-md md:text-sm text-[#093F51]">
            Ver todos los productos →
          </a>
        </div>
        <ProductSlideShow productos={productos} />
      </section>

      <CategorySlideShow />

      <section className="px-4 sm:px-8 lg:px-24 py-8 relative">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Tiendas Oficiales</h2>
          <a href="/tiendas" className="text-sm md:text-sm text-[#093F51]">
            Ver todas las tiendas →
          </a>
        </div>
        <StoreSlideShow tiendas={tiendas} />
      </section>
    </>
  );
}
