// components/ProductSlideShow.tsx
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
    <>
      <button className="cursor-pointer swiper-button-prev-product absolute left-4 sm:left-16 top-[50%] z-10 transform -translate-y-1/2 bg-[#575757] shadow-md rounded-full p-2 text-white">
        <IoChevronBack size={24} />
      </button>

      <button className="cursor-pointer swiper-button-next-product absolute right-4 sm:right-16 top-[50%] z-10 transform -translate-y-1/2 bg-[#575757] shadow-md rounded-full p-2 text-white">
        <IoChevronForward size={24} />
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-product",
          prevEl: ".swiper-button-prev-product",
        }}
        spaceBetween={16}
        slidesPerView={1}
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
    </>
  );
};
