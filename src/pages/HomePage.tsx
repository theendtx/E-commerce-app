import Header from "../shared/ui/Header";
import Layout from "../shared/ui/Layout";
import ProductsList from "../features/products/ui/ProductGrid";

type Props = {
  products: any[];
  addToCart: (product: any) => void;
  cartCount: number;
};

function HomePage({ products, addToCart, cartCount }: Props) {
  return (
    <>
    <h2>Products: {products.length}</h2>
    <h2>Cart: {cartCount}</h2>

    <Header />
    <Layout>
      <ProductsList 
        products={products}
        addToCart={addToCart}
      />
    </Layout>
    </>
  )
}

export default HomePage;