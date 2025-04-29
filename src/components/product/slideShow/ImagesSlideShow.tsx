"use client";

import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

interface Props {
  images: { imagen: string }[]; // Cambiado para aceptar un arreglo de objetos
  title: string;
  className?: string;
}

export const ImagesSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100%",
          height: "auto", // Ajuste dinámico según la imagen
        }}
        pagination
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={1024} // Ajusta el tamaño según lo necesites
              height={800}
              src={image.imagen} // Usamos `image.imagen` para acceder a la URL
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
