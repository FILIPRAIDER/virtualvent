"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage } from "../product-image/ProductImage"; // Asegúrate de tener el componente ProductImage
import { ProductImageVerticalSwiper } from "./ProductImageVerticalSwiper"; // Importamos el swiper vertical

interface Props {
  images: { imagen: string }[]; // Arreglo de objetos con las imágenes
  title: string;
  className?: string;
}

export const ImagesSlideShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper] = useState<any>();
  const [swiperMain, setSwiperMain] = useState<any>(); // Estado para el swiper principal

  // Función para cambiar la imagen grande cuando se hace clic en una miniatura
  const handleThumbnailClick = (index: number) => {
    swiperMain.slideTo(index); // Navegar al slide correspondiente en el swiper principal
  };

  return (
    <div className={className}>
      {/* Mini Swiper Vertical solo en dispositivos de escritorio */}
      <ProductImageVerticalSwiper
        images={images}
        title={title}
        onThumbnailClick={handleThumbnailClick} // Enlazamos la función para hacer clic
      />

      {/* Slider Principal (Imagen Grande) */}
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        onSwiper={setSwiperMain} // Establecer el swiper principal
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
              height={500}
              src={image.imagen}
              alt={title}
              className="rounded-lg object-cover h-[500px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
