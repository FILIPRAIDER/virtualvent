"use client";

import { currencyFormat } from "@/utils";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { placeOrder } from "@/actions";
import { useShallow } from "zustand/react/shallow";

export const PlaceOrder = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [errorMessagge, setErrorMessagge] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { total, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    const productsToOrder = cart.map((p) => ({
      productId: p.id,
      quantity: p.quantity,
    }));

    const resp = await placeOrder(productsToOrder);

    if (!resp.ok) {
      setErrorMessagge(resp.message ?? "Ocurrió un error inesperado");
      setIsPlacingOrder(false);
      return;
    }

    clearCart();
    if (resp.order) {
      router.replace("/orders/" + resp.order.id);
    }
  };

  if (!loaded) return <p>Cargando...</p>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit w-full max-w-[400px]">
      <h2 className="text-lg mb-2 font-semibold">Resumen del Carrito</h2>

      <div className="grid grid-cols-2 text-sm">
        <span>Nº Productos</span>
        <span className="text-right">{itemsInCart}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(total)}</span>

        <hr className="col-span-2 my-2" />

        <span className="font-bold">Total</span>
        <span className="font-bold text-right">{currencyFormat(total)}</span>
      </div>

      <p className="text-[11px] text-gray-600 mt-4">
        ⚠️ Importante: los productos se recogen únicamente en la Universidad
        Cooperativa de Colombia – Montería. No realizamos envíos.
      </p>

      <div className="mt-5 mb-2">
        <button
          onClick={onPlaceOrder}
          className={clsx(
            "w-full py-2 rounded text-white text-sm cursor-pointer",
            isPlacingOrder ? "bg-gray-400 cursor-not-allowed" : "bg-[#093F51]"
          )}
          disabled={isPlacingOrder}
        >
          Confirmar compra
        </button>
        {errorMessagge && (
          <p className="text-red-500 mt-2 text-sm">{errorMessagge}</p>
        )}
      </div>

      <div className="text-sm mt-6">
        <h3 className="font-semibold mb-1">Detalles de la persona</h3>
        <p>
          <strong>Nombre:</strong> {session?.user?.name}
        </p>
        <p>
          <strong>Correo:</strong> {session?.user?.email}
        </p>
      </div>
    </div>
  );
};
