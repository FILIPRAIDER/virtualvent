import { getProductBySlug } from "@/actions";
import { ImagesSlideShow, ProductMobileSlideshow } from "@/components";
import { currencyFormat, normalizeSlug } from "@/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5"; // Importar el icono de "volver"
import { transformSlugToTitle } from "@/utils/TransformSlugToTittle";

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
  const normalizedSlug = transformSlugToTitle(slug);

  console.log(normalizedSlug); // Verifica el slug normalizado
  const producto = await getProductBySlug(normalizedSlug);

  if (!producto || !producto.imagenes || producto.imagenes.length === 0) {
    notFound(); // Redirige a "No encontrado" si el producto no existe
  }

  const imageUrls = producto.imagenes.map((img) => ({ imagen: img.imagen }));

  return (
    <>
      <Link
        href="/"
        className="flex items-center text-[#093F51] my-4 px-3 md:px-40"
      >
        <IoArrowBack size={24} className="mr-2" /> Volver atrás
      </Link>
      <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 md:w-[80%] mx-auto ">
        {/* Enlace para volver atrás con icono */}

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
            className="hidden md:flex"
            images={imageUrls}
            title={producto.nombre}
          />
        </div>

        {/* Detalles del producto */}
        <div className="col-span-1 px-5">
          <h1 className="antialiased poppins font-semibold text-2xl">
            {producto.nombre}
          </h1>
          <p className="text-lg mb-5">
            <span className="font-semibold">
              {currencyFormat(Number(producto.precio))}{" "}
            </span>
            por <span className="lowercase">{producto.unidad}</span>
          </p>
          <AddToCart product={producto} />

          {/* Descripción */}
          <h3 className="font-bold text-lg">Descripción</h3>
          <p className="font-light">{producto.descripcion}</p>
        </div>
      </div>
    </>
  );
}
