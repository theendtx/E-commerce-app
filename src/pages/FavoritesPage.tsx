import { Link } from "react-router-dom";

import Header from "../shared/ui/Header";

function FavoritesPage() {
  return (
    <>
    <Header />
    <main className="page-shell">
      <section className="empty-state">
        <p className="eyebrow">Favorites</p>
        <h1>Favorites Page</h1>
        <p className="muted">Favorite products can be added here later.</p>
        <Link className="primary-button" to="/">
          Back to shop
        </Link>
      </section>
    </main>
    </>
  );
}

export default FavoritesPage;
