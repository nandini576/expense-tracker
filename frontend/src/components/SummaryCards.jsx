import React, { useEffect, useState } from "react";
import "./SummaryCards.css";
import { apiFetch } from "../api/apiFetch";

function SummaryCards() {

  const [summary, setSummary] = useState({
    totalBudget: 0,
    totalSpent: 0,
    remaining: 0
  });

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const fetchSummary = async () => {
    const data = await apiFetch(`/budget/status?month=${month}&year=${year}`);

    let totalBudget = 0;
    let totalSpent = 0;

    data.forEach(item => {
      totalBudget += item.budget || 0;
      totalSpent += item.spent || 0;
    });

    setSummary({
      totalBudget,
      totalSpent,
      remaining: totalBudget - totalSpent
    });
  };

  useEffect(() => {
    fetchSummary();

    const handler = () => {
      fetchSummary();
    };

    window.addEventListener("refreshDashboard", handler);

    return () => window.removeEventListener("refreshDashboard", handler);
  }, []);

  return (
    <div className="summary-grid">

      <div className="summary-card">
        <p>Total Budget</p>
        <h3>₹{summary.totalBudget}</h3>
      </div>

      <div className="summary-card">
        <p>Total Spent</p>
        <h3>₹{summary.totalSpent}</h3>
      </div>

      <div className="summary-card">
        <p>Remaining</p>
        <h3>₹{summary.remaining}</h3>
      </div>

    </div>
  );
}

export default SummaryCards;