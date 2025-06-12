"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface Props {
  tiendas: { razon_social: string; logo: string }[];
}

export const StoreSlideShow = ({ tiendas }: Props) => {
  if (!tiendas.length) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-center w-60 sm:w-72 flex-col items-center"
          >
            <div className="w-full h-72 bg-gray-300 rounded-[6px]" />
            <div className="w-32 h-4 bg-gray-300 mt-3 rounded" />
            <div className="w-24 h-4 bg-gray-300 mt-2 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <button className="swiper-button-prev-store absolute left-4 sm:left-16 top-[50%] z-10 transform -translate-y-1/2 bg-[#575757] shadow-md rounded-full p-2 text-white">
        <IoChevronBack size={24} />
      </button>

      <button className="swiper-button-next-store absolute right-4 sm:right-16 top-[50%] z-10 transform -translate-y-1/2 bg-[#575757] shadow-md rounded-full p-2 text-white">
        <IoChevronForward size={24} />
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-store",
          prevEl: ".swiper-button-prev-store",
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
        {tiendas.map((tienda, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center">
              <div className="w-60 sm:w-72">
                <Image
                  src={tienda.logo || "/default-logo.png"}
                  alt={tienda.razon_social}
                  width={256}
                  height={256}
                  className="rounded-[6px] w-full h-40 object-contain"
                  priority
                />
                <p className="text-center mt-2 text-sm font-medium text-[#252525] break-words leading-tight">
                  {tienda.razon_social}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
