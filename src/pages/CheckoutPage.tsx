import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useCartStore } from "../store/cartStore";
import Header from "../shared/ui/Header";

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: "card" | "cash";
};

function CheckoutPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const cart = useCartStore((state) => state.cart);

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cart]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutForm>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      paymentMethod: "card"
    }
  });

  function onSubmit(values: CheckoutForm) {
    const customerCode = values.fullName
      .replace(/\s/g, "")
      .slice(0, 3)
      .toUpperCase();
    const totalCode = Math.round(totalPrice * 100);

    setOrderNumber(`EC-${customerCode}-${cart.length}${totalCode}`);
    reset();
  }

  if (cart.length === 0) {
    return (
      <>
      <Header cartCount={cart.length} />
      <main className="page-shell">
        <section className="empty-state">
          <h1>Your cart is empty</h1>
          <p className="muted">Add products before checkout.</p>
          <Link className="primary-button" to="/">
            Continue shopping
          </Link>
        </section>
      </main>
      </>
    );
  }

  return (
    <>
    <Header cartCount={cart.length} />
    <main className="page-shell checkout-layout">
      <section className="form-panel">
        <Link className="text-link" to="/cart">
          Back to cart
        </Link>

        <div>
          <p className="eyebrow">Checkout</p>
          <h1>Customer information</h1>
        </div>

        <form className="stack-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Full name
            <input
              placeholder="Aruzhan Sapar"
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Full name must be at least 3 characters"
                }
              })}
            />
            {errors.fullName && (
              <span className="field-error">{errors.fullName.message}</span>
            )}
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="customer@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email"
                }
              })}
            />
            {errors.email && (
              <span className="field-error">{errors.email.message}</span>
            )}
          </label>

          <label>
            Phone
            <input
              placeholder="+7 700 000 00 00"
              {...register("phone", {
                required: "Phone is required",
                minLength: {
                  value: 8,
                  message: "Enter a valid phone number"
                }
              })}
            />
            {errors.phone && (
              <span className="field-error">{errors.phone.message}</span>
            )}
          </label>

          <label>
            Address
            <input
              placeholder="Street, building, apartment"
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 8,
                  message: "Address must be more detailed"
                }
              })}
            />
            {errors.address && (
              <span className="field-error">{errors.address.message}</span>
            )}
          </label>

          <label>
            City
            <input
              placeholder="Almaty"
              {...register("city", {
                required: "City is required"
              })}
            />
            {errors.city && (
              <span className="field-error">{errors.city.message}</span>
            )}
          </label>

          <label>
            Payment method
            <select {...register("paymentMethod")}>
              <option value="card">Card</option>
              <option value="cash">Cash on delivery</option>
            </select>
          </label>

          <button className="primary-button" disabled={isSubmitting}>
            Place order
          </button>
        </form>

        {orderNumber && (
          <p className="success-message">
            Order {orderNumber} created successfully.
          </p>
        )}
      </section>

      <aside className="summary-panel">
        <h2>Order summary</h2>
        <div className="summary-items">
          {cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>{item.title}</span>
              <strong>
                {item.quantity} x ${item.price.toFixed(2)}
              </strong>
            </div>
          ))}
        </div>
        <div className="summary-total">
          <span>Total</span>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
      </aside>
    </main>
    </>
  );
}

export default CheckoutPage;
