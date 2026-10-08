import { Link } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";

type Props = {
  cartCount?: number;
};

function Header({ cartCount = 0 }: Props) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <header className="app-header">
      <Link className="brand" to="/">
        EC Store
      </Link>

      <nav>
        <Link to="/favorites">Favorites</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>

      <div className="header-actions">
        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>

        {token ? (
          <>
            <span className="user-chip">{user?.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link className="button-link" to="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
