import Header from "../shared/ui/Header";
import Layout from "../shared/ui/Layout";
import ProductsList from "../features/products/ui/ProductGrid";
import { Link } from "react-router";

type Props = {
  products: any[];
  addToCart: (product: any) => void;
  cartCount: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
};

function HomePage({ products, addToCart, cartCount, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, setSortOrder }: Props) {
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

    <p>Selected category: {selectedCategory}</p>

    {
  products.length === 0 && (
    <h2>No products found</h2>
  )
}

<button
  onClick={() =>
    setSortOrder("asc")
  }
>
  Price ↑
</button>

<button
  onClick={() =>
    setSortOrder("desc")
  }
>
  Price ↓
</button>

    <button
  onClick={() => setSelectedCategory("all")}
>
  All
</button>

<button
  onClick={() =>
    setSelectedCategory("electronics")
  }
>
  Electronics
</button>

<button
  onClick={() =>
    setSelectedCategory("jewelery")
  }
>
  Jewelery
</button>

<button
  onClick={() =>
    setSelectedCategory("men's clothing")
  }
>
  Men's Clothing
</button>

<button
  onClick={() =>
    setSelectedCategory("women's clothing")
  }
>
  Women's Clothing
</button>

<Link to="/favorites">Favorites</Link>

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