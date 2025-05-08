"use client";

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils/currencyFormat";
import { redirect } from "next/navigation";

export const OrderSummary = () => {
  const cart = useCartStore((state) => state.cart);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (isClient && cart.length === 0) {
      redirect("/");
    }
  }, [isClient, cart]);

  if (!isClient) return null;

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
