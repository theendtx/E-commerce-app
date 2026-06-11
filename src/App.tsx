import Header from "./shared/ui/Header";
import Layout from "./shared/ui/Layout";
import ProductList from "./features/products/ui/ProductGrid";

function App() {
  return (
    <>
      <Header />
      <Layout>
        <ProductList />
      </Layout>
    </>
  )
}

export default App;