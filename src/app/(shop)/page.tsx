// app/page.tsx

import { TiShoppingCart } from "react-icons/ti";
import { getAllShops } from "@/actions/shop/get-all-shops";
import { ProductSlideShow, StoreSlideShow } from "@/components";
import { BannerSlide } from "./ui/BannerSlide";
import { getCanastaCampesina } from "@/actions";
import Link from "next/link";

export default async function Home() {
  const [productos, tiendas] = await Promise.all([
    getCanastaCampesina(),
    getAllShops(),
  ]);

  return (
    <>
      <BannerSlide />
      <section className="px-4 sm:px-8 lg:px-24 py-8 relative">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-8">
          {/* <h2 className="text-2xl sm:text-xl font-bold">Tiendas Oficiales</h2> */}
          {/* <Link href="/tiendas" className="text-sm md:text-sm text-[#093F51]">
            Ver todas las tiendas →
          </Link> */}
        </div>
        <StoreSlideShow tiendas={tiendas} />
      </section>
      <section className="px-4 sm:px-8 lg:px-24 py-8 relative">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-8">
          <h2 className="text-3xl font-bold">Lista de Productos</h2>
          {/* <Link href="/productos" className="text-md md:text-sm text-[#093F51]">
            Ver todos los productos →
          </Link> */}
        </div>
        <ProductSlideShow productos={productos} />
      </section>
      <section className="px-4 sm:px-8 lg:px-24 py-8 mb-10 relative">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Personaliza tu ancheta
          </h2>
          <Link href="/personalizar" className="text-sm text-[#093F51]">
            Ir a personalizar →
          </Link>
        </div>

        <Link
          href="/personalizar"
          className="border border-gray-300 bg-white h-40 rounded-xl p-6 flex flex-col justify-center items-center hover:shadow-md transition cursor-pointer"
        >
          <TiShoppingCart size={60} className="text-gray-400 mb-4" />
          <span className="text-gray-600 text-center text-sm">
            Agrega productos y arma tu ancheta personalizada
          </span>
        </Link>
      </section>
    </>
  );
}
