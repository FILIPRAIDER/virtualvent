import { TbShoppingCart } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";
import { normalizeSlug } from "@/utils"; // Asegúrate de que la función normalizeSlug esté correctamente importada
import { currencyFormat } from "@/utils"; // Asegúrate de que la función currencyFormat esté correctamente importada
import { useCartStore } from "@/store"; // Importa el store para manejar el carrito

interface Props {
  producto: {
    nombre: string;
    uuid: string; // Asumimos que el id es el uuid del producto
    imagenes: { imagen: string }[]; // Arreglo de objetos con propiedad 'imagen'
    precio: string;
    unidad: string;
    stock: number;
  };
}

export const ProductCard = ({ producto }: Props) => {
  const slug = normalizeSlug(producto.nombre); // Normalizamos el nombre del producto

  // Verificamos que 'producto.imagenes' tenga al menos una imagen
  const imageUrl =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[0].imagen
      : "/imgs/Yuca.png"; // Ruta a una imagen por defecto si no hay imágenes

  // Usamos el store de Zustand para manejar el carrito
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  // Función para manejar la adición al carrito
  const handleAddToCart = () => {
    const cartProduct = {
      id: producto.uuid,
      uuid: producto.uuid, // <-- AÑADIR ESTA LÍNEA
      slug,
      title: producto.nombre,
      price: Number(producto.precio),
      quantity: 1,
      image: imageUrl,
      stock: producto.stock,
    };

    addProductToCart(cartProduct);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white w-70 overflow-hidden">
        <Link href={`/producto/${slug}`}>
          <Image
            src={imageUrl} // Usamos la URL de la primera imagen o la imagen por defecto
            alt={producto.nombre}
            width={276}
            height={348}
            className="w-70 h-80 object-cover rounded-[6px] cursor-pointer"
            priority
          />
        </Link>
        <div className="py-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-[#364153] font-semibold">
              {producto.nombre}
            </h3>
            <span className="font-light text-[#575757]">{producto.unidad}</span>
          </div>

          <p className="text-lg text-[#252525] font-semibold">
            {currencyFormat(Number(producto.precio))}{" "}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`/producto/${slug}`}
              className=" w-full cursor-pointer hover:bg-[#093f51] hover:text-white text-[#093f51] border border-[#093f51] py-2 rounded flex items-center justify-center gap-2 text-sm"
            >
              Ver Producto
            </Link>
            <button
              onClick={handleAddToCart} // Llamamos a la función para agregar al carrito
              className="bg-[#093F51] py-1.5 px-2.5 rounded cursor-pointer"
            >
              <TbShoppingCart size={24} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
