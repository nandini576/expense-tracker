import React, { useEffect, useState } from "react";
import "./ExpenseSection.css";
import { MdDelete } from "react-icons/md";
import { apiFetch } from "../api/apiFetch";

function ExpenseSection() {

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const fetchExpenses = async () => {
    const data = await apiFetch("/expenses");
    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();

    const handler = () => {
      fetchExpenses();
    };

    window.addEventListener("refreshDashboard", handler);

    return () => window.removeEventListener("refreshDashboard", handler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !date) return;

    await apiFetch("/expenses", {
      method: "POST",
      body: JSON.stringify({
        amount: Number(amount),
        category,
        description,
        date
      })
    });

    await apiFetch(`/risk/calculate?month=${month}&year=${year}`);

    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");

    await fetchExpenses();

    window.dispatchEvent(new Event("refreshDashboard"));
  };

  const handleDelete = async (id) => {

    await apiFetch(`/expenses/${id}`, {
      method: "DELETE"
    });

    await apiFetch(`/risk/calculate?month=${month}&year=${year}`);

    await fetchExpenses();

    window.dispatchEvent(new Event("refreshDashboard"));
  };

  return (
    <div className="section-card">

      <div className="section-header">
        <h3>Expenses</h3>
      </div>

      <form className="expense-form" onSubmit={handleSubmit}>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Add Expense</button>

      </form>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <p>No expenses found.</p>
        </div>
      ) : (
        <table className="expense-table">

          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((item) => (
              <tr key={item._id}>
                <td>₹{item.amount}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{new Date(item.date).toLocaleDateString("en-IN")}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                    <MdDelete size={22} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}

export default ExpenseSection;