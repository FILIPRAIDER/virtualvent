"use client";

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils/currencyFormat";
import { useRouter } from "next/navigation";

export const OrderSummary = () => {
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (isClient && cart.length === 0) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [isClient, cart, router]);

  if (!isClient) return null;

  const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const ahora = new Date();
  const fechaLimite = new Date("2025-06-16T12:00:00-05:00");
  const aplicaDescuento = subtotal >= 100000 && ahora < fechaLimite;
  const descuento = aplicaDescuento ? subtotal * 0.2 : 0;
  const total = subtotal - descuento;

  return (
    <div className="text-sm space-y-2">
      <div className="flex justify-between">
        <span>Nº Productos</span>
        <span>{itemsInCart}</span>
      </div>

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{currencyFormat(subtotal)}</span>
      </div>

      {aplicaDescuento && (
        <div className="flex justify-between text-green-700">
          <span>Descuento 20%</span>
          <span>-{currencyFormat(descuento)}</span>
        </div>
      )}

      <hr className="my-2" />

      <div className="flex justify-between font-semibold text-base">
        <span>Total</span>
        <span>{currencyFormat(total)}</span>
      </div>
    </div>
  );
};
