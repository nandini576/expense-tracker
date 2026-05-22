import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/apiFetch";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      setLoading(true);
      setError("");
      setSuccess("");

      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      setSuccess("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (er) {

      setError(er.message || "Registration failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="register-page">

      <div className="register-card">

        {/* LEFT SECTION */}

        <div className="register-left">

          <h2 className="project-title">
            Expense Tracker
          </h2>

          <h1 className="register-heading">
            Create Account
          </h1>

          <p className="register-left-desc">
            Create your account and start tracking expenses, budgets, and spending insights.
          </p>

          <div className="feature-box">

            <div className="feature-item">
              ✔ Track Expenses
            </div>

            <div className="feature-item">
              ✔ Manage Budgets
            </div>

            <div className="feature-item">
              ✔ Analyze Spending
            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div className="register-right">

          <h2 className="register-title">
            Register
          </h2>

          <p className="register-desc">
            Fill in your details to continue.
          </p>

          {error && <p className="error-msg">{error}</p>}

          {success && <p className="success-msg">{success}</p>}

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
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
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁️"}
                </span>

              </div>

            </div>

            <div className="form-group">

              <label>Confirm Password</label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

            </div>

            <button
              className="register-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Register"}
            </button>

          </form>

          <p className="login-redirect">

            Already have an account?

            <span onClick={() => navigate("/login")}>
              Login
            </span>

          </p>

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

        </div>

      </div>

    </div>
  );
}

export default Register;