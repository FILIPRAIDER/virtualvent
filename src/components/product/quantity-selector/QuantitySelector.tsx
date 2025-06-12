"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
  stock: number;
}

export const QuantitySelector = ({
  quantity,
  onQuantityChanged,
  stock,
}: Props) => {
  const onValueChanged = (value: number) => {
    const newValue = quantity + value;

    if (newValue < 0) return; // ahora se permite hasta 0
    if (newValue > stock) return;

    onQuantityChanged(newValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-md font-light text-[#575757]">Cantidad:</p>
      <div className="flex items-center">
        <button
          className="cursor-pointer disabled:opacity-30"
          onClick={() => onValueChanged(-1)}
          disabled={quantity <= 0}
        >
          <IoRemoveCircleOutline size={30} />
        </button>
        <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
          {quantity}
        </span>
        <button
          className="cursor-pointer disabled:opacity-30"
          onClick={() => onValueChanged(1)}
          disabled={quantity >= stock}
        >
          <IoAddCircleOutline size={30} />
        </button>
      </div>
    </div>
  );
};
