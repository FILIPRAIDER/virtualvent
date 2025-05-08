"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getAllShops } from "@/actions/shop/get-all-shops";
import { useEffect, useState } from "react";

export const StoreSlideShow = () => {
  const [tiendas, setTiendas] = useState<{ nombre: string; imagen: string }[]>(
    []
  );

  useEffect(() => {
    const fetchTiendas = async () => {
      const shops = await getAllShops();
      setTiendas(
        shops.map((shop) => ({
          nombre: shop.nombre,
          imagen: shop.logo || "", // Provide a fallback if logo is null
        }))
      );
    };

    fetchTiendas();
  }, []);

  return (
    <section className="px-4 sm:px-8 lg:px-24 py-8 relative">
      {/* Título */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Tiendas Oficiales</h2>
        <a href="/tiendas" className="text-sm md:text-sm text-[#093F51]">
          Ver todas las tiendas →
        </a>
      </div>

      {/* Flechas personalizadas */}
      <button className="swiper-button-prev-store absolute left-4 sm:left-16 top-[50%] z-10 transform -translate-y-1/2 bg-[#575757] shadow-md rounded-full p-2 text-white">
        <IoChevronBack size={24} />
      </button>

      <button className="swiper-button-next-store absolute right-4 sm:right-16 top-[50%] z-10 transform -translate-y-1/2 bg-[#575757] shadow-md rounded-full p-2 text-white">
        <IoChevronForward size={24} />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-store",
          prevEl: ".swiper-button-prev-store",
        }}
        spaceBetween={16}
        slidesPerView={1} // Por defecto 1 elemento en pantallas pequeñas
        breakpoints={{
          640: {
            slidesPerView: 2, // 2 productos en pantallas medianas
          },
          768: {
            slidesPerView: 3, // 3 productos en pantallas grandes
          },
          1024: {
            slidesPerView: 4, // 4 productos en pantallas más grandes
          },
        }}
        className="pb-10"
      >
        {tiendas.map((tienda, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center">
              <div className="w-60 sm:w-72">
                <Image
                  src={tienda.imagen}
                  alt={tienda.nombre}
                  width={256}
                  height={256}
                  className="rounded-[6px] w-full h-72 object-cover"
                  priority
                />
                <p className="text-center mt-2 text-lg font-semibold text-[#252525]">
                  {tienda.nombre}
                </p>
                <p className="text-center text-sm text-[#093F51] flex items-center justify-center gap-1">
                  Ver ubicación <FaMapMarkerAlt />
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};