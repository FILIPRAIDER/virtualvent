"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { currencyFormat } from "@/utils";
import { TbShoppingCart } from "react-icons/tb";

const productos = [
  {
    nombre: "Yuca",
    precio: 1200,
    unidad: "Libra",
    imagen: "/imgs/yuca.png",
  },
  {
    nombre: "Papa",
    precio: 1200,
    unidad: "Libra",
    imagen: "/imgs/yuca.png",
  },
  {
    nombre: "Mango",
    precio: 1200,
    unidad: "Unidad",
    imagen: "/imgs/yuca.png",
  },
  {
    nombre: "Naranja",
    precio: 1200,
    unidad: "Libra",
    imagen: "/imgs/yuca.png",
  },
  {
    nombre: "Mandarina",
    precio: 1200,
    unidad: "Libra",
    imagen: "/imgs/yuca.png",
  },
];

export const ProductSlideShow = () => {
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
            <div className="flex justify-center">
              <div className="bg-white w-70 overflow-hidden">
                <Image
                  src={producto.imagen}
                  alt={producto.nombre}
                  width={276}
                  height={348}
                  className="w-70 h-80 object-cover rounded-[6px]"
                  priority
                />
                <div className="py-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg text-[#364153] font-semibold">
                      {producto.nombre}
                    </h3>
                    <span className="font-light text-[#575757]">
                      {producto.unidad}
                    </span>
                  </div>

                  <p className="text-lg text-[#252525] font-semibold">
                    {currencyFormat(producto.precio)}{" "}
                  </p>
                  <div className="flex items-center gap-2">
                    <button className=" w-full cursor-pointer hover:bg-[#093f51] hover:text-white text-[#093f51] border border-[#093f51] py-2 rounded flex items-center justify-center gap-2 text-sm">
                      Ver Producto
                    </button>
                    <button className="bg-[#093F51] py-1.5 px-2.5 rounded cursor-pointer">
                      <TbShoppingCart size={24} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
