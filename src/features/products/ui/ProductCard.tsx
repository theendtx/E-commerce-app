import { Link } from "react-router-dom";

import type { Product } from "../../../shared/types/Product";
import { useFavoritesStore } from "../../../store/favoritesStore";

type Props = {
  product: Product;
  addToCart: (product: Product) => void;
};

function ProductCard({ product, addToCart }: Props) {
  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  const isFavorite = useFavoritesStore((state) =>
    state.favorites.some((item) => item.id === product.id)
  );

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.price.toFixed(2)}</p>
      </Link>

      <div className="product-card-actions">
        <button
          type="button"
          className="favorite-button"
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(product)}
        >
          {isFavorite ? "\u2665" : "\u2661"}
        </button>

        <button
          type="button"
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
