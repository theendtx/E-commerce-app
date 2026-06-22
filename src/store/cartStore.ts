import { create } from "zustand";
import type { Product } from "../shared/types/Product";
import type { CartItem } from "../shared/types/CartItem";

interface CartStore {
  cart: CartItem[];

  addToCart: (product: Product) => void;

  increaseQuantity: (id: number) => void;

  decreaseQuantity: (id: number) => void;

  removeFromCart: (id: number) => void;
}

export const useCartStore =
  create<CartStore>((set) => ({
    cart: [],

    addToCart: (product) =>
      set((state) => {
        const existingProduct =
          state.cart.find(
            item => item.id === product.id
          );

        if (existingProduct) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id
                ? {
                    ...item,
                    quantity:
                      item.quantity + 1
                  }
                : item
            )
          };
        }

        return {
          cart: [
            ...state.cart,
            {
              ...product,
              quantity: 1
            }
          ]
        };
      }),

    increaseQuantity: (id) =>
      set((state) => ({
        cart: state.cart.map(item =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
        )
      })),

    decreaseQuantity: (id) =>
      set((state) => ({
        cart: state.cart
          .map(item =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity - 1
                }
              : item
          )
          .filter(
            item => item.quantity > 0
          )
      })),

    removeFromCart: (id) =>
      set((state) => ({
        cart: state.cart.filter(
          item => item.id !== id
        )
      }))
  }));