import { create } from "zustand";

type User = {
  email: string;
  name: string;
};

type AuthStore = {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const TOKEN_KEY = "ec-auth-token";
const USER_KEY = "ec-auth-user";

function getSavedUser() {
  const savedUser = localStorage.getItem(USER_KEY);

  if (!savedUser) {
    return null;
  }

  return JSON.parse(savedUser) as User;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem(TOKEN_KEY),
  user: getSavedUser(),

  login: (email, password) => {
    if (!email || password.length < 6) {
      return false;
    }

    const user = {
      email,
      name: email.split("@")[0]
    };
    const token = crypto.randomUUID();

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    set({
      token,
      user
    });

    return true;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    set({
      token: null,
      user: null
    });
  }
}));
