import ProductGrid from "../features/products/ui/ProductGrid";
import Header from "../shared/ui/Header";
import Layout from "../shared/ui/Layout";
import type { Product } from "../shared/types/Product";

type Props = {
  products: Product[];
  addToCart: (product: Product) => void;
  cartCount: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
};

const categories = [
  { label: "All", value: "all" },
  { label: "Electronics", value: "electronics" },
  { label: "Jewelery", value: "jewelery" },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" }
];

function HomePage({
  products,
  addToCart,
  cartCount,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder
}: Props) {
  return (
    <>
      <Header cartCount={cartCount} />

      <Layout>
        <section className="shop-toolbar">
          <div>
            <p className="eyebrow">Catalog</p>
            <h1>Products</h1>
            <p className="muted">
              {products.length} items found · Cart {cartCount}
            </p>
          </div>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </section>

        <section className="filter-bar">
          <button
            className={sortOrder === "asc" ? "active" : ""}
            onClick={() => setSortOrder("asc")}
          >
            Price up
          </button>

          <button
            className={sortOrder === "desc" ? "active" : ""}
            onClick={() => setSortOrder("desc")}
          >
            Price down
          </button>

          {categories.map((category) => (
            <button
              className={
                selectedCategory === category.value ? "active" : ""
              }
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </section>

        {products.length === 0 ? (
          <section className="empty-state">
            <h2>No products found</h2>
          </section>
        ) : (
          <ProductGrid products={products} addToCart={addToCart} />
        )}
      </Layout>
    </>
  );
}

export default HomePage;
