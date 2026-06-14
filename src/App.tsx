import Header from "./shared/ui/Header";
import Layout from "./shared/ui/Layout";
import ProductList from "./features/products/ui/ProductGrid";
import { getProducts } from "./shared/api/productApi";
import { useEffect, useState } from "react";

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
    <h2>Products: {products.length}</h2>
      <Header />
      <Layout>
        <ProductList products={products} />
      </Layout>
    </>
  )
}

export default App;