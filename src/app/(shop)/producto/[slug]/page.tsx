import { getProductBySlug } from "@/actions";
import {
  ImagesSlideShow,
  ProductMobileSlideshow,
  StockLabel,
} from "@/components";
import { currencyFormat, normalizeSlug } from "@/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  const image = product?.imagenes?.[0]?.imagen;

  return {
    title: product?.nombre ?? "Producto no encontrado",
    description: product?.descripcion ?? "Producto no encontrado",
    openGraph: {
      title: product?.nombre ?? "Producto no encontrado",
      description: product?.descripcion ?? "Producto no encontrado",
      images: image
        ? [
            {
              url: image.startsWith("http") ? image : `/products/${image}`,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const producto = await getProductBySlug(normalizedSlug);

  if (!producto || !producto.imagenes || producto.imagenes.length === 0) {
    notFound(); // Redirige a "No encontrado" si el producto no existe
  }

  const imageUrls = producto.imagenes.map((img) => ({ imagen: img.imagen }));

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Galería de imágenes */}
      <div className="col-span-1 md:col-span-2 w-full px-1.5">
        {/* Slider para dispositivos móviles */}
        <ProductMobileSlideshow
          className="block md:hidden"
          images={imageUrls}
          title={producto.nombre}
        />
        {/* Slider para escritorio */}
        <ImagesSlideShow
          className="hidden md:block"
          images={imageUrls}
          title={producto.nombre}
        />
      </div>

      {/* Detalles del producto */}
      <div className="col-span-1 px-5">
        <StockLabel slug={producto.nombre} />
        <h1 className="antialiased font-bold text-xl">{producto.nombre}</h1>
        <p className="text-lg mb-5">
          {currencyFormat(Number(producto.precio))}
        </p>
        <AddToCart product={producto} />

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{producto.descripcion}</p>
      </div>
    </div>
  );
}
