"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { ProductCard } from "../../product/product-card/ProductCard";
import { ProductoConImagen } from "@/interfaces";

interface Props {
  productos: ProductoConImagen[];
}

export const ProductSlideShow = ({ productos }: Props) => {
  return (
    <section className="px-24 py-8 relative">
      {/* Título */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Lista de Productos</h2>
        <a href="/productos" className="text-sm text-[#093F51]">
          Ver todos los productos →
        </a>
      </div>

      {/* Flechas personalizadas */}
      <button className="cursor-pointer swiper-button-prev-product absolute left-16 top-[50%] z-10 transform -translate-y-1/2 bg-[#575757] shadow-md rounded-full p-2 text-white">
        <IoChevronBack size={24} />
      </button>

      <button className="cursor-pointer swiper-button-next-product absolute right-16 top-[50%] z-10 transform -translate-y-1/2 bg-[#575757] shadow-md rounded-full p-2 text-white">
        <IoChevronForward size={24} />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-product",
          prevEl: ".swiper-button-prev-product",
        }}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {productos.map((producto, index) => (
          <SwiperSlide key={index}>
            <ProductCard producto={producto} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
