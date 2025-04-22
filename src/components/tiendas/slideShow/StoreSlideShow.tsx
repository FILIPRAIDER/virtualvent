"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

const tiendas = [
  {
    nombre: "El Rincón del Campo",
    imagen: "/imgs/tienda.png",
  },
  {
    nombre: "Campo Vivo",
    imagen: "/imgs/tienda.png",
  },
  {
    nombre: "Sabor Natural",
    imagen: "/imgs/tienda.png",
  },
  {
    nombre: "Carnes del Llano",
    imagen: "/imgs/tienda.png",
  },
  {
    nombre: "Quesos La Pradera",
    imagen: "/imgs/tienda.png",
  },
];

export const StoreSlideShow = () => {
  return (
    <section className="px-24 py-8 relative">
      {/* Título */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Tiendas Oficiales</h2>
        <a href="/tiendas" className="text-sm text-[#093F51]">
          Ver todas las tiendas →
        </a>
      </div>

      {/* Flechas personalizadas */}
      <button className="swiper-button-prev-store absolute left-16 top-[50%] z-10 transform -translate-y-1/2 bg-[#575757] shadow-md rounded-full p-2 text-white">
        <IoChevronBack size={24} />
      </button>

      <button className="swiper-button-next-store absolute right-16 top-[50%] z-10 transform -translate-y-1/2 bg-[#575757] shadow-md rounded-full p-2 text-white">
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
        slidesPerView={2}
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
              <div className="w-70">
                <Image
                  src={tienda.imagen}
                  alt={tienda.nombre}
                  width={256}
                  height={256}
                  className="rounded-[6px] w-full h-70 object-cover"
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
