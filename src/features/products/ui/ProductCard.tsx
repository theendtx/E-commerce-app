import { Link } from "react-router-dom";

import type { Product } from "../../../shared/types/Product";

type Props = {
  product: Product;
  addToCart: (product: Product) => void;
};

function ProductCard({ product, addToCart }: Props) {
  return (
    <article className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-link"
      >
        <img src={product.image} alt={product.title} />

        <h3>{product.title}</h3>

        <p>${product.price.toFixed(2)}</p>
      </Link>

      <button onClick={() => addToCart(product)}>
        Add To Cart
      </button>
    </article>
  );
}

export default ProductCard;
