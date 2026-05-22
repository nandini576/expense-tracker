import React, { useEffect, useState } from "react";
import "./BudgetSection.css";
import { apiFetch } from "../api/apiFetch";

function BudgetSection() {

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState([]);

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const fetchBudgets = async () => {
    const data = await apiFetch(
      `/budget/status?month=${month}&year=${year}`
    );

    setBudgets(data);
  };

  useEffect(() => {

    fetchBudgets();

    const handler = () => {
      fetchBudgets();
    };

    window.addEventListener("refreshDashboard", handler);

    return () => {
      window.removeEventListener("refreshDashboard", handler);
    };

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!category || !amount) return;

    await apiFetch("/budget", {
      method: "POST",
      body: JSON.stringify({
        category,
        amount: Number(amount),
        month,
        year
      })
    });

    setCategory("");
    setAmount("");

    await fetchBudgets();

    window.dispatchEvent(new Event("refreshDashboard"));
  };

  return (

    <div className="section-card">

      <div className="section-header">
        <h3>Budgets</h3>
      </div>

      {/* FORM */}

      <form
        className="budget-form"
        onSubmit={handleSubmit}
      >

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Movie</option>
          <option>Health</option>
          <option>Education</option>
          <option>Other</option>
        </select>

        <input
          type="number"
          placeholder="Enter Budget Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">
          Add Budget
        </button>

      </form>

      {/* TABLE */}

      {
        budgets.length === 0 ? (

          <div className="empty-state">

            <p>No budgets added.</p>

            <span>
              Add category budgets to track your expenses.
            </span>

          </div>

        ) : (

          <table className="budget-table">

            <thead>
              <tr>
                <th>Category</th>
                <th>Budget</th>
                <th>Spent</th>
                <th>Remaining</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {
                budgets.map((item, i) => (

                  <tr key={i}>

                    <td>{item.category}</td>

                    <td>
                      ₹{item.budget}
                    </td>

                    <td>
                      ₹{item.spent}
                    </td>

                    <td>
                      ₹{item.remaining}
                    </td>

                    <td
                      className={
                        item.status === "OVER"
                          ? "over"
                          : "ok"
                      }
                    >
                      {item.status}
                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>
        )
      }

    </div>
  );
}

export default BudgetSection;