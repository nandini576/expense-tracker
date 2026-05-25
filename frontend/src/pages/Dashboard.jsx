import React from "react";
import "./Dashboard.css";
import NavBar from "../components/NavBar";
import SummaryCards from "../components/SummaryCards";
import BudgetSection from "../components/BudgetSection";
import ExpenseSection from "../components/ExpenseSection";
import RiskSection from "../components/RiskSection";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <div className="dashboard">
      <NavBar />

      <div className="dashboard-container">
        <div className="welcome-row">
          <div>
            <h2>Dashboard</h2>
            <p>Track budgets, expenses and spending risks.</p>
          </div>
        </div>

        <SummaryCards />

        <div className="dashboard-grid">
          <BudgetSection />
          <ExpenseSection onChange={null} />
        </div>

        <RiskSection />
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;