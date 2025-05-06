"use client";

import { useState } from "react";
// Import Swiper React components
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideshow.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
  images: { imagen: string }[]; // Arreglo de objetos con las imágenes
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      {/* Slider Principal */}
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10} // Espaciado entre las imágenes
        navigation={true} // Habilitar navegación
        thumbs={{ swiper: thumbsSwiper }} // Conectar el slider principal con el mini slider
        modules={[FreeMode, Navigation, Thumbs]} // Usamos FreeMode y Thumbs
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <ProductImage
              width={1024} // Tamaño de las imágenes en el slider principal
              height={800}
              src={image.imagen}
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mini Slider con margen en X */}
      <Swiper
        onSwiper={setThumbsSwiper} // Establecer la referencia del mini slider
        spaceBetween={10} // Espaciado entre las miniaturas
        slidesPerView={4} // Mostrar 4 miniaturas a la vez
        freeMode={true} // Habilitar modo libre
        watchSlidesProgress={true} // Permite hacer seguimiento del progreso
        modules={[FreeMode, Navigation, Thumbs]} // Usamos FreeMode y Thumbs
        className="mySwiper my-4 mx-4" // Agregado el margen en el eje X con mx-4
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <ProductImage
              width={300} // Tamaño de las miniaturas
              height={300}
              src={image.imagen}
              alt={title}
              className="rounded-lg object-cover cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
