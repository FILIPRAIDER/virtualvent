"use client";

import { QuantitySelector } from "@/components";
import { CartProduct, ProductoClient } from "@/interfaces"; // Asegúrate de importar la interfaz 'producto'
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  product: ProductoClient; // Aceptamos un objeto de tipo 'producto'
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [quantity, setQuantity] = useState<number>(1); // Solo evaluamos la cantidad
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (quantity <= 0 || quantity > product.stock) {
      // Validación de cantidad disponible en el stock
      setPosted(false);
      return; // No agregar al carrito si la cantidad no es válida
    }

    console.log({ quantity, product });

    const cartProduct: CartProduct = {
      id: product.id.toString(), // ✅ bigint → string
      slug: product.nombre.toLowerCase().replace(/\s+/g, "-"),
      title: product.nombre,
      price: Number(product.precio), // ✅ Decimal → number
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

      {/* Selector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
        stock={product.stock}
      />

      {/* Botón para agregar al carrito */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
