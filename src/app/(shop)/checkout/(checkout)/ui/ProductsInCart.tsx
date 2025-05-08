"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Espere...</p>;

  return (
    <>
      {productsInCart.map((product) => (
        <div key={product.id} className="flex items-center gap-4 mb-5">
          <Image
            src={product.image || "/imgs/default-product.png"}
            width={100}
            height={100}
            alt={product.title}
            className="w-[100px] h-[100px] object-cover rounded"
          />

          <div className="flex-1">
            <p className="text-sm font-medium text-[#093F51]">
              {product.title}
            </p>
            <p className="text-sm text-gray-600">
              Cantidad: {product.quantity}
            </p>
            <p className="font-bold text-sm text-[#252525]">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
