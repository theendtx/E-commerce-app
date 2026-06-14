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
      element={<HomePage />}
    />

    <Route
      path="/product/:id"
      element={<ProductDetailsPage />}
    />
  </Routes>
</BrowserRouter>

    <h2>Products: {products.length}</h2>
      <Header />
      <Layout>
        <ProductList products={products} />
      </Layout>
    </>
  )
}

export default App;