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
      slug: product.nombre.toLowerCase().replace(/\s+/g, "-"),
      title: product.nombre,
      price: Number(product.precio),
      quantity: quantity,
      image: product.imagenes?.[0]?.imagen || "",
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
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
