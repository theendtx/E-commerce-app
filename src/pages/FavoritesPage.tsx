
import { Link } from "react-router-dom";

import ProductGrid from "../features/products/ui/ProductGrid";
import Header from "../shared/ui/Header";
import { useCartStore } from "../store/cartStore";
import { useFavoritesStore } from "../store/favoritesStore";

function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Header cartCount={cartCount} />

      <main className="page-shell">
        <section className="cart-header">
          <div>
            <p className="eyebrow">Favorites</p>
            <h1>My Favorite Products</h1>
            <p className="muted">
              {favorites.length} favorite products
            </p>
          </div>

          <Link className="primary-button" to="/">
            Back to shop
          </Link>
        </section>

        {favorites.length === 0 ? (
          <section className="empty-state">
            <h2>No favorite products yet</h2>
            <p className="muted">
              Browse the shop and press the heart button
              to save products here.
            </p>
            <Link className="primary-button" to="/">
              Explore products
            </Link>
          </section>
        ) : (
          <ProductGrid
            products={favorites}
            addToCart={addToCart}
          />
        )}
      </main>
    </>
  );
}

export default FavoritesPage;
