import { create } from "zustand";

type Theme = "light" | "dark";

type ThemeStore = {
  theme: Theme;
  toggleTheme: () => void;
};

const THEME_KEY = "ec-theme";

function getSavedTheme(): Theme {
  return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: getSavedTheme(),

  toggleTheme: () =>
    set((state) => {
      const theme = state.theme === "light" ? "dark" : "light";

      localStorage.setItem(THEME_KEY, theme);
      document.documentElement.dataset.theme = theme;

      return { theme };
    })
}));
