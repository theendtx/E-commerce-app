
import { getProducts } from "./shared/api/productApi";
import { useEffect, useState } from "react";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import type { Product } from "./shared/types/Product";
import { useCartStore } from "./store/cartStore";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
 const [products, setProducts] = useState<Product[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");

  

  const categoryFilteredProducts = selectedCategory === "all"
  ? products
  : products.filter(
      product =>
        product.category === selectedCategory
  )

  const filteredProducts = categoryFilteredProducts.filter(product =>
    product.title
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );

  const sortedProducts = [...filteredProducts];


  const [sortOrder, setSortOrder] = useState("default");

  if (sortOrder === "asc") {
  sortedProducts.sort(
    (a: Product, b: Product) =>
      a.price - b.price
  );
}

if (sortOrder === "desc") {
  sortedProducts.sort(
    (a: Product, b: Product) =>
      b.price - a.price
  );
}

  const {
  cart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} = useCartStore();

  
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

    <Route
      path="/favorites"
      element={<FavoritesPage />}
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