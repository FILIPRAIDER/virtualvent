"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const categorias = [
  {
    nombre: "Frutas",
    imagen: "/imgs/categoria.png",
  },
  {
    nombre: "Verduras",
    imagen: "/imgs/categoria.png",
  },
  {
    nombre: "Cereales y granos",
    imagen: "/imgs/categoria.png",
  },
  {
    nombre: "Carnes",
    imagen: "/imgs/categoria.png",
  },
  {
    nombre: "Leche y derivados",
    imagen: "/imgs/categoria.png",
  },
];

export const CategorySlideShow = () => {
  return (
    <section className="px-4 sm:px-8 lg:px-24 py-8 relative">
      {/* Título */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Lista de Categorías</h2>
        <a href="/categorias" className="text-sm md:text-sm text-[#093F51]">
          Ver todas las categorías →
        </a>
      </div>

      {/* Flechas personalizadas */}
      <button className="swiper-button-prev-category absolute left-4 sm:left-16 top-[50%] z-10 transform -translate-y-1/2 bg-[#575757] shadow-md rounded-full p-2 text-white">
        <IoChevronBack size={24} />
      </button>

      <button className="swiper-button-next-category absolute right-4 sm:right-16 top-[50%] z-10 transform -translate-y-1/2 bg-[#575757] shadow-md rounded-full p-2 text-white">
        <IoChevronForward size={24} />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-category",
          prevEl: ".swiper-button-prev-category",
        }}
        spaceBetween={16}
        slidesPerView={1} // Inicialmente 1 elemento en pantallas pequeñas
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
        {categorias.map((categoria, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center">
              <div className="w-60 sm:w-72">
                <Image
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  width={256}
                  height={256}
                  className="rounded-[6px] w-full h-72 object-cover"
                  priority
                />
                <p className="text-center mt-2 text-lg font-semibold text-[#252525]">
                  {categoria.nombre}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
