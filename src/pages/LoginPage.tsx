import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

type LoginForm = {
  email: string;
  password: string;
};

type LocationState = {
  from?: string;
};

function LoginPage() {
  const [loginError, setLoginError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const redirectTo = state?.from ?? "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  function onSubmit(values: LoginForm) {
    setLoginError("");

    const success = login(values.email, values.password);

    if (!success) {
      setLoginError("Email and password are required.");
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <main className="page-shell auth-page">
      <section className="form-panel">
        <Link className="text-link" to="/">
          Back to shop
        </Link>

        <div>
          <p className="eyebrow">Account</p>
          <h1>Login</h1>
          <p className="muted">
            Use any email and a password with at least 6 characters.
          </p>
        </div>

        <form className="stack-form" onSubmit={handleSubmit(onSubmit)}>
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
            Password
            <input
              type="password"
              placeholder="At least 6 characters"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            {errors.password && (
              <span className="field-error">{errors.password.message}</span>
            )}
          </label>

          {loginError && <p className="field-error">{loginError}</p>}

          <button className="primary-button" disabled={isSubmitting}>
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
