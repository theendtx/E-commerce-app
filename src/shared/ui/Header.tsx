import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <Link to="/cart">
  Cart
</Link>
        </header>
    );
}

export default Header;