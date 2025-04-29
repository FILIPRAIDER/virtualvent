"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
  stock: number; // Añadimos stock como propiedad
}

export const QuantitySelector = ({
  quantity,
  onQuantityChanged,
  stock,
}: Props) => {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return; // Prevent less than 1
    if (quantity + value > stock) return; // Prevent exceeding stock

    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex items-center">
      <button
        className="cursor-pointer"
        onClick={() => onValueChanged(-1)}
        disabled={quantity <= 1} // Deshabilitar el botón si la cantidad es 1
      >
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {quantity}
      </span>
      <button
        className="cursor-pointer"
        onClick={() => onValueChanged(1)}
        disabled={quantity >= stock} // Deshabilitar el botón si la cantidad alcanza el stock
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
