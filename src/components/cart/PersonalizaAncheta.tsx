"use client";

import { ProductoConImagen } from "@/interfaces";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import { currencyFormat } from "@/utils";

interface Props {
  productos: ProductoConImagen[];
}

export const PersonalizaAncheta = ({ productos }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleChange = (uuid: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [uuid]: quantity }));
  };

  const seleccionados = useMemo(() => {
    return productos.filter(
      (p) => quantities[p.uuid] && quantities[p.uuid] > 0
    );
  }, [quantities, productos]);

  const total = useMemo(() => {
    return seleccionados.reduce((acc, p) => {
      return acc + Number(p.precio) * (quantities[p.uuid] || 0);
    }, 0);
  }, [seleccionados, quantities]);

  const itemsInCart = useMemo(() => {
    return seleccionados.reduce((acc, p) => acc + (quantities[p.uuid] || 0), 0);
  }, [seleccionados, quantities]);

  const handleAddAllToCart = () => {
    if (total < 50000) {
      Swal.fire({
        icon: "warning",
        title: "Monto insuficiente",
        text: "La ancheta debe tener al menos $50.000 en productos",
        confirmButtonColor: "#093F51",
      });
      return;
    }

    seleccionados.forEach((p) => {
      addProductToCart({
        id: p.id.toString(),
        uuid: p.uuid,
        slug: p.nombre.toLowerCase().replace(/\s+/g, "-"),
        title: p.nombre,
        price: Number(p.precio),
        quantity: quantities[p.uuid],
        image: p.imagenes?.[0]?.imagen || "",
        stock: p.stock,
      });
    });

    Swal.fire({
      icon: "success",
      title: "¡Productos agregados!",
      text: "Tu ancheta personalizada se ha guardado en el carrito",
      confirmButtonColor: "#093F51",
    });
  };

  return (
    <>
      <div className="space-y-6 w-full">
        {productos.map((p) => (
          <div
            key={p.uuid}
            className="flex flex-row sm:flex-row items-start gap-4 border-b border-gray-300 pb-4"
          >
            {/* Imagen a la izquierda */}
            <div className="flex flex-col items-center w-24 flex-shrink-0">
              <img
                src={p.imagenes?.[0]?.imagen || "/default.jpg"}
                alt={p.nombre}
                className="w-24 h-24 object-contain rounded-md"
              />
              <p className="text-xs md:text-[15px] font-medium text-center mt-2">
                {p.nombre}
                <br />
                <span className="text-gray-500 font-normal">({p.unidad})</span>
                <span className="text-gray-500 font-normal">
                  {currencyFormat(Number(p.precio))}
                </span>
              </p>
            </div>

            {/* Selector y precio a la derecha */}
            <div className="flex ml-10 flex-col justify-between flex-1 sm:flex-row sm:items-center w-full">
              <QuantitySelector
                quantity={quantities[p.uuid] || 0}
                onQuantityChanged={(qty) => handleChange(p.uuid, qty)}
                stock={p.stock}
              />
              <span className="text-md font-medium mt-3 sm:mt-0 sm:ml-4">
                ${Number(p.precio) * (quantities[p.uuid] || 0)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen de la compra */}
      <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 w-full">
        <h2 className="text-lg font-semibold mb-4">Resumen de tu ancheta</h2>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Nº Productos</span>
            <span>{itemsInCart}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        <button
          onClick={handleAddAllToCart}
          className="mt-6 w-full bg-[#093F51] text-white py-3 rounded text-sm cursor-pointer"
        >
          Agregar ancheta al carrito
        </button>
      </div>
    </>
  );
};
