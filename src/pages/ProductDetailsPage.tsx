import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProduct } from "../shared/api/productApi";
import Header from "../shared/ui/Header";
import type { Product } from "../shared/types/Product";
import { useCartStore } from "../store/cartStore";
import { useFavoritesStore } from "../store/favoritesStore";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const cart = useCartStore((state) => state.cart);
  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );
  const isFavorite = useFavoritesStore((state) =>
    product ? state.isFavorite(product.id) : false
  );
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      if (!id) {
        setError("Product id was not found.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const data = await getProduct(id);

        if (isMounted) {
          setProduct(data);
        }
      } catch {
        if (isMounted) {
          setProduct(null);
          setError("Өнімді жүктеу мүмкін болмады");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id, reloadKey]);

  if (isLoading) {
    return (
      <>
        <Header cartCount={cartCount} />
        <h2 className="status-message">Loading...</h2>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header cartCount={cartCount} />
        <main className="page-shell">
          <section className="empty-state">
            <h1>{error}</h1>
            <button
              className="primary-button"
              type="button"
              onClick={() => setReloadKey((value) => value + 1)}
            >
              Қайта жүктеу
            </button>
          </section>
        </main>
      </>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="page-shell">
        <Link className="text-link" to="/">
          Back to shop
        </Link>

        <section className="product-details">
          <img src={product.image} alt={product.title} />

          <div>
            <p className="eyebrow">{product.category}</p>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <h2>${product.price.toFixed(2)}</h2>

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
          </div>
        </section>
      </main>
    </>
  );
}

export default ProductDetailsPage;
