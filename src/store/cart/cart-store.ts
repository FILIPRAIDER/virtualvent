import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    total: number;
    itemsInCart: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.cantidad, 0);
      },

      getSummaryInformation: () => {
        const cart = get().cart;
        const total = cart.reduce(
          (acc, item) => acc + item.precio * item.cantidad,
          0
        );
        const itemsInCart = cart.reduce((acc, item) => acc + item.cantidad, 0);
        return { total, itemsInCart };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        const existing = cart.find((item) => item.id === product.id);

        if (!existing) {
          set({ cart: [...cart, product] });
        } else {
          const updated = cart.map((item) =>
            item.id === product.id
              ? { ...item, cantidad: item.cantidad + product.cantidad }
              : item
          );
          set({ cart: updated });
        }
      },

      updateProductQuantity: (productId: string, quantity: number) => {
        const updated = get().cart.map((item) =>
          item.id === productId ? { ...item, cantidad: quantity } : item
        );
        set({ cart: updated });
      },

      removeProduct: (productId: string) => {
        const updated = get().cart.filter((item) => item.id !== productId);
        set({ cart: updated });
      },

      clearCart: () => set({ cart: [] }),
    }),
    { name: "agro-cart" }
  )
);
