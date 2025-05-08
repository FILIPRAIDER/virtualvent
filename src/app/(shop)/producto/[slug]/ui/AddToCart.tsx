"use client";

import { QuantitySelector } from "@/components";
import { CartProduct, ProductoClient } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  product: ProductoClient;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (quantity <= 0 || quantity > product.stock) {
      setPosted(false);
      return; // No agregar al carrito si la cantidad no es válida
    }

    const cartProduct: CartProduct = {
      id: product.id.toString(),
      uuid: product.uuid,
      slug: product.nombre.toLowerCase().replace(/\s+/g, "-"),
      title: product.nombre,
      price: Number(product.precio),
      quantity: quantity,
      image: product.imagenes?.[0]?.imagen || "",
      stock: product.stock,
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1); // Reseteamos la cantidad después de agregar al carrito
  };

  return (
    <>
      {posted && quantity <= 0 && (
        <span className="mt-2 text-red-500 fade-in">
          La cantidad debe ser mayor que 0
        </span>
      )}
      {posted && quantity > product.stock && (
        <span className="mt-2 text-red-500 fade-in">
          No hay suficiente stock disponible
        </span>
      )}

      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
        stock={product.stock}
      />
      <div className="flex flex-col items-center justify-center mt-10 gap-4">
        <button className="bg-[#093F51] text-white w-full rounded h-12 cursor-pointer">
          Comprar ahora
        </button>
        <button
          onClick={addToCart}
          className="btn-primary mb-5 w-full border border-[#093F51] h-12 rounded bg-white text-[#093F51] cursor-pointer"
        >
          Agregar al carrito
        </button>
      </div>
    </>
  );
};
