
import { getProducts } from "./shared/api/productApi";
import { useEffect, useState } from "react";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState<any[]>([]);

  
  function addToCart(product: any) {
  const existingProduct = cart.find(
    item => item.id === product.id
  );

  if (existingProduct) {
    setCart(
      cart.map(item =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );
  } else {
    setCart([
      ...cart,
      {
        ...product,
        quantity: 1
      }
    ]);
  }
}

function increaseQuantity(id: number) {
  setCart(
    cart.map(item => 
      item.id === id
      ? {
        ...item,
        quantity: item.quantity + 1
      
      }
      : item
    )
  );
}

function decreaseQuantity(id: number) {
  setCart(
    cart
      .map(item =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )
      .filter(item => item.quantity > 0)
  );
}

function removeFromCart(id: number) {
  setCart(
    cart.filter(item => item.id !== id)
  );
}

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    
    loadProducts();
  }, []);

  

  return (
    <>
    <BrowserRouter>
  <Routes>
    <Route
      path="/"
      element={
        <HomePage
          products={products}
          addToCart={addToCart}
          cartCount={cart.length}
        />
      }
    />

    <Route
      path="/product/:id"
      element={<ProductDetailsPage />}
    />
    

    <Route
      path="/cart"
      element={<CartPage 
        cart={cart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />}
    />
  </Routes>
</BrowserRouter>
    </>
  )
}

export default App;