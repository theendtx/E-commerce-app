import { createContext, type ReactNode } from "react";

type CartContextValue = object;

const CartContext = createContext<CartContextValue>({});

function CartProvider({ children }: { children: ReactNode }) {
  return (
    <CartContext.Provider value={{}}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
