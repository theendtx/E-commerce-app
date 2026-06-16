type Props = {
    cart: any[];
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
};

function CartPage({ cart, increaseQuantity, decreaseQuantity, removeFromCart }: Props) {
    return (
        <>
        <h1>Shopping Cart</h1>

        {cart.map(item => (
            <div key={item.id}>
  <h3>{item.title}</h3>

  <p>Quantity: {item.quantity}</p>

  <button
    onClick={() =>
      increaseQuantity(item.id)
    }
  >
    +
  </button>

  <button
    onClick={() =>
      decreaseQuantity(item.id)
    }
  >
    -
  </button>

  <button
    onClick={() =>
      removeFromCart(item.id)
    }
  >
    Delete
  </button>
</div>
        ))}
        </>
    )
}

export default CartPage;