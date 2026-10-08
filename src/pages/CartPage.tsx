import { Link } from "react-router-dom";

import type { CartItem } from "../shared/types/CartItem";
import Header from "../shared/ui/Header";

type Props = {
  cart: CartItem[];
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

function CartPage({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
}: Props) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
    <Header cartCount={cart.length} />
    <main className="page-shell">
      <section className="cart-header">
        <div>
          <p className="eyebrow">Cart</p>
          <h1>Shopping Cart</h1>
        </div>

        <h2>Total: ${totalPrice.toFixed(2)}</h2>
      </section>

      {cart.length === 0 ? (
        <section className="empty-state">
          <h2>Your cart is empty</h2>
          <Link className="primary-button" to="/">
            Continue shopping
          </Link>
        </section>
      ) : (
        <>
          <section className="cart-list">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />

                <div>
                  <h3>{item.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>

                <div className="quantity-actions">
                  <button onClick={() => increaseQuantity(item.id)}>
                    +
                  </button>

                  <button onClick={() => decreaseQuantity(item.id)}>
                    -
                  </button>

                  <button onClick={() => removeFromCart(item.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </section>

          <Link className="primary-button checkout-button" to="/checkout">
            Checkout
          </Link>
        </>
      )}
    </main>
    </>
  );
}

export default CartPage;
