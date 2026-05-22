import React, { useEffect, useState } from "react";
import "./BudgetSection.css";
import { MdEdit } from "react-icons/md";
import { apiFetch } from "../api/apiFetch";

function BudgetSection() {

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState([]);

  const [editingCategory, setEditingCategory] = useState(null);

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

    if (editingCategory) {

      await apiFetch("/budget", {
        method: "PUT",
        body: JSON.stringify({
          category,
          monthlyBudget: Number(amount),
          month,
          year
        })
      });

    } else {

      await apiFetch("/budget", {
        method: "POST",
        body: JSON.stringify({
          category,
          monthlyBudget: Number(amount),
          month,
          year
        })
      });

    }

    setCategory("");
    setAmount("");
    setEditingCategory(null);

    await fetchBudgets();

    window.dispatchEvent(new Event("refreshDashboard"));
  };

  const handleEdit = (item) => {

    setEditingCategory(item.category);

    setCategory(item.category);

    setAmount(item.budget);

  };

  return (

    <div className="section-card">

      <div className="section-header">
        <h3>Budgets</h3>
      </div>

      <form
        className="budget-form"
        onSubmit={handleSubmit}
      >

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={editingCategory}
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

          {
            editingCategory
              ? "Update Budget"
              : "Add Budget"
          }

        </button>

      </form>

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
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {
                budgets.map((item, i) => (

                  <tr
                    key={i}
                    className={
                      editingCategory === item.category
                        ? "editing-row"
                        : ""
                    }
                  >

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
                        item.status === "OVER BUDGET"
                          ? "over"
                          : "ok"
                      }
                    >
                      {item.status}
                    </td>

                    <td>

                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        <MdEdit size={20} />
                      </button>

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