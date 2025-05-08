"use client";

import { useCartStore } from "@/store";
import { ProductImage, QuantitySelector } from "@/components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TbTrash } from "react-icons/tb";

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Cargando productos...</p>;

  return (
    <div className="space-y-6 w-full md:w-[670px] mx-auto">
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.id}`}
          className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-300 pb-4"
        >
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            alt={product.title}
            className="rounded-md"
          />

          <div className="flex-1 w-full sm:w-auto">
            <Link
              href={`/producto/${product.slug}`}
              className="block font-semibold text-sm hover:underline"
            >
              {product.title}
            </Link>
            <span className="text-xs text-gray-500">{product.id}</span>

            <div className="mt-2 flex items-center justify-between gap-3">
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChanged={(qty) =>
                  updateProductQuantity(product.id, qty)
                }
                stock={product.stock}
              />
              <div className="flex items-center gap-2">
                <span className="text-md md: text-xl font-medium">
                  ${product.price * product.quantity}
                </span>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TbTrash size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
