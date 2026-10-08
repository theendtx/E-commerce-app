import type { Product } from "../../../shared/types/Product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  addToCart?: (product: Product) => void;
};

function ProductGrid({ products, addToCart }: Props) {
  const handleAdd = addToCart ?? (() => {});

  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={handleAdd}
        />
      ))}
    </section>
  );
}

export default ProductGrid;
