"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
  images: { imagen: string }[]; // Arreglo de objetos con las imágenes
  title: string;
  onThumbnailClick: (index: number) => void; // Recibimos la función para cambiar la imagen
}

export const ProductImageVerticalSwiper = ({
  images,
  title,
  onThumbnailClick,
}: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();

  return (
    <div className="md:block md:w-24 md:h-[400px] md:overflow-y-auto md:mr-4 mt-1">
      <Swiper
        onSwiper={setThumbsSwiper} // Establecer la referencia del mini slider
        spaceBetween={10} // Espaciado entre las miniaturas
        slidesPerView={4} // Mostrar 4 miniaturas a la vez
        freeMode={true} // Habilitar modo libre
        watchSlidesProgress={true} // Permite hacer seguimiento del progreso
        direction="vertical" // Cambiamos a vertical
        modules={[FreeMode, Navigation, Thumbs]} // Usamos FreeMode y Thumbs
        className="mySwiper"
        style={{ height: "100%" }} // Aseguramos que el swiper ocupe el 100% de la altura disponible
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} onClick={() => onThumbnailClick(index)}>
            <ProductImage
              width={100} // Tamaño de las miniaturas
              height={100}
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
