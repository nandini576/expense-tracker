import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleNavigation = () => {
      const token = localStorage.getItem("token");
      if (token) 
        navigate("/dashboard");
       else 
        navigate("/register");
  };

  return (
    <div>
      <NavBar />

      <div>
        {/* --------section 1 */}
        <div className="section1">

          {/* LEFT SIDE */}
          <div className="section1-left">

            {/* title */}
            <div className="hero-title">
              <div className="title-blue">Expense Tracker</div>
              <div className="title-light">System</div>
            </div>

            {/* description */}
            <div className="hero-desc">
              Track your daily expenses, manage budgets, and gain insights into your spending habits easily.
            </div>

            {/* buttons */}
            <div className="hero-buttons">
              <button
                className="btn-primary"
               onClick={handleNavigation}
              >
                Get Started
              </button>

              <button
                className="btn-secondary"
                onClick={handleNavigation}
              >
                View Dashboard
              </button>
            </div>

            {/* stats */}
            <div className="hero-stats">

              <div className="stat-box">
                <div className="stat-number">₹10K+</div>
                <div className="stat-text">Tracked</div>
              </div>

              <div className="stat-box">
                <div className="stat-number">200+</div>
                <div className="stat-text">Transactions</div>
              </div>

              <div className="stat-box">
                <div className="stat-number">50+</div>
                <div className="stat-text">Budgets Set</div>
              </div>

              <div className="stat-box">
                <div className="stat-number">100%</div>
                <div className="stat-text">Control</div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="section1-right">

            <div className="portal-card float1">
              <div className="portal-icon">💰</div>
              <h5>Track Expenses</h5>
            </div>

            <div className="portal-card float2">
              <div className="portal-icon">📊</div>
              <h5>View Analytics</h5>
            </div>

            <div className="portal-card float3">
              <div className="portal-icon">📅</div>
              <h5>Manage Budget</h5>
            </div>

          </div>

        </div>

        {/* ----------section2 */}
        <div className="section2">

          <h2 className="section2-title">Everything You Need</h2>

          <p className="section2-desc">
            A complete solution to manage your personal finances efficiently
          </p>

          <div className="section2-cards">

            <div
              className="feature-card"
              onClick={handleNavigation}
            >
              <div className="card-content">
                <h3>Add Expenses</h3>
                <p>Record your daily spending quickly and easily.</p>
              </div>
              <span className="card-arrow">→</span>
            </div>

            <div
              className="feature-card"
              onClick={handleNavigation}
            >
              <div className="card-content">
                <h3>View Expenses</h3>
                <p>Track and review all your transactions in one place.</p>
              </div>
              <span className="card-arrow">→</span>
            </div>

            <div
              className="feature-card"
              onClick={handleNavigation}
            >
              <div className="card-content">
                <h3>Budget Tracking</h3>
                <p>Set limits and monitor your spending habits.</p>
              </div>
              <span className="card-arrow">→</span>
            </div>

            <div
              className="feature-card"
              onClick={handleNavigation}
            >
              <div className="card-content">
                <h3>Insights</h3>
                <p>Understand where your money goes with analytics.</p>
              </div>
              <span className="card-arrow">→</span>
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Home;