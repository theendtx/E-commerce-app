import Header from "../shared/ui/Header";
import Layout from "../shared/ui/Layout";
import ProductsList from "../features/products/ui/ProductGrid";

type Props = {
  products: any[];
  addToCart: (product: any) => void;
  cartCount: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

function HomePage({ products, addToCart, cartCount, searchTerm, setSearchTerm }: Props) {
  return (
    <>
    <h2>Products: {products.length}</h2>
    <h2>Cart: {cartCount}</h2>

    <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    />

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