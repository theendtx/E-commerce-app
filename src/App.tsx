import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import "./App.css";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { getProducts } from "./shared/api/productApi";
import ProtectedRoute from "./shared/ui/ProtectedRoute";
import type { Product } from "./shared/types/Product";
import { useCartStore } from "./store/cartStore";
import { useThemeStore } from "./store/themeStore";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const {
    data: products = [],
    isLoading,
    error
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProducts
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCartStore();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const categoryFilteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  const filteredProducts = categoryFilteredProducts.filter((product) =>
    product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts];

  if (sortOrder === "asc") {
    sortedProducts.sort(
      (a: Product, b: Product) => a.price - b.price
    );
  }

  if (sortOrder === "desc") {
    sortedProducts.sort(
      (a: Product, b: Product) => b.price - a.price
    );
  }

  if (isLoading) {
    return <h1 className="status-message">Loading...</h1>;
  }

  if (error) {
    return <h1 className="status-message">Error loading products</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={sortedProducts}
              addToCart={addToCart}
              cartCount={cart.length}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetailsPage />}
        />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/favorites" element={<FavoritesPage />} />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
