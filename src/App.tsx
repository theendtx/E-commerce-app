import Header from "./shared/ui/Header";
import Layout from "./shared/ui/Layout";
import ProductList from "./features/products/ui/ProductGrid";
import { getProducts } from "./shared/api/productApi";
import { useEffect, useState } from "react";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";
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
  </Routes>
</BrowserRouter>
    </>
  )
}

export default App;