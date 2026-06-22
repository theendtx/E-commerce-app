import { createContext, useContext } from "react";

interface CartContextValue {
}

const CartContext = createContext<CartContextValue>({});

export function CartProvider({ children }: { children: React.ReactNode }) {
    return (
        <CartContext.Provider value={{}}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}