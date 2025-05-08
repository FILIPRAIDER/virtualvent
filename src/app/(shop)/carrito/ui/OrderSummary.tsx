"use client";

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils/currencyFormat";
import { useRouter } from "next/navigation";

export const OrderSummary = () => {
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isEmptying, setIsEmptying] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (isClient && cart.length === 0) {
      setIsEmptying(true);
      setTimeout(() => {
        router.push("/");
      });
    }
  }, [isClient, cart, router]);

  if (!isClient) return null;

  if (isEmptying) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 gap-4 text-sm text-gray-600">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-[#093F51] rounded-full animate-spin" />
        <p>Redirigiendo al inicio...</p>
      </div>
    );
  }

  const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="text-sm space-y-2">
      <div className="flex justify-between">
        <span>Nº Productos</span>
        <span>{itemsInCart}</span>
      </div>

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{currencyFormat(total)}</span>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between font-semibold text-base">
        <span>Total</span>
        <span>{currencyFormat(total)}</span>
      </div>
    </div>
  );
};
