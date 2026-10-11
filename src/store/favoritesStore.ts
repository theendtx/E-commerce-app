
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "../shared/types/Product";

interface FavoritesStore {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
  removeFavorite: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product) =>
        set((state) => {
          const exists = state.favorites.some(
            (item) => item.id === product.id
          );

          return {
            favorites: exists
              ? state.favorites.filter(
                  (item) => item.id !== product.id
                )
              : [...state.favorites, product]
          };
        }),

      isFavorite: (id) =>
        get().favorites.some((item) => item.id === id),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (item) => item.id !== id
          )
        }))
    }),
    {
      name: "ec-favorites",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites
      })
    }
  )
);
