"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { ProductCard } from "../../product/product-card/ProductCard";
import { ProductoConImagen } from "@/interfaces";

export const ProductSlideShow = () => {
  const [productos, setProductos] = useState<ProductoConImagen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("/api/productos");

        if (!res.ok) {
          const message = await res.text();
          console.error("Error del servidor:", message);
          setError(true);
          return;
        }

        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        No se pudieron cargar los productos.
      </p>
    );

  return (
    <section className="px-4 sm:px-8 lg:px-24 py-8 relative">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold">Lista de Productos</h2>
        <a href="/productos" className="text-md md:text-sm text-[#093F51]">
          Ver todos los productos →
        </a>
      </div>

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
    </section>
  );
};
