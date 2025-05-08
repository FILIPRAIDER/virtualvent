"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { SkeletonStoreCard } from "@/app/(shop)/ui/SkeletonStoreCard";

export const StoreSlideShow = () => {
  const [tiendas, setTiendas] = useState<
    { razon_social: string; logo: string }[]
  >([]);

  useEffect(() => {
    const fetchTiendas = async () => {
      try {
        const res = await fetch("/api/tiendas");

        if (!res.ok) {
          const message = await res.text();
          console.error("Error al cargar tiendas:", message);
          return;
        }

        const data = await res.json();
        setTiendas(data);
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    fetchTiendas();
  }, []);

  if (!tiendas.length) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonStoreCard key={index} />
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
                  className="rounded-[6px] w-full h-72 object-contain"
                  priority
                />
                <p className="text-center mt-2 text-lg font-semibold text-[#252525]">
                  {tienda.razon_social}
                </p>
                <p className="text-center text-sm text-[#093F51] flex items-center justify-center gap-1">
                  Ver ubicación <FaMapMarkerAlt />
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
