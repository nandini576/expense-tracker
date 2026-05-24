import { useState, useContext, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextStore";
import { apiFetch } from "../api/apiFetch";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const { login, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, [logout]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      login(data);

      navigate("/dashboard");

    } catch (er) {

      setError(er.message || "Login failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        {/* LEFT SECTION */}

        <div className="login-left">

          <h2 className="project-title">
            Expense Tracker
          </h2>

          <h1 className="login-heading">
            Welcome Back
          </h1>

          <p className="login-left-desc">
            Login to track expenses, manage budgets, and monitor your spending easily.
          </p>

          <div className="feature-box">

            <div className="feature-item">
              ✔ Track Daily Expenses
            </div>

            <div className="feature-item">
              ✔ Budget Management
            </div>

            <div className="feature-item">
              ✔ Spending Analytics
            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div className="login-right">

          <h2 className="login-title">
            Login
          </h2>

          <p className="login-desc">
            Enter your credentials to continue.
          </p>

          {error && <p className="error-msg">{error}</p>}

          <form onSubmit={handleSubmit} autoComplete="off">

            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                name="login-email"
                autoComplete="off"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>Password</label>

              <div className="password-wrapper">

                <input
                  type={showPassword ? "text" : "password"}
                  name="login-password"
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁️"}
                </span>

              </div>

            </div>

            <button
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="register-link">

            Don't have an account?

            <span onClick={() => navigate("/register")}>
              Register
            </span>

          </p>

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;
