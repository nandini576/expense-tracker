import mongoose from "mongoose";
import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";
import Risk from "../models/Risk.js";

export const calculateRisk = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const m = Number(req.query.month);
    const y = Number(req.query.year);
    if (!m || !y || isNaN(m) || isNaN(y)) {
      return res.status(400).json({ message: "month and year required" });
    }
    const budgets = await Budget.find({ userId, month: m, year: y });
    const startDate = new Date(y, m - 1, 1);
    const endDate = new Date(y, m, 0, 23, 59, 59);
    const result = [];
    for (let budget of budgets) {
      const expenses = await Expense.aggregate([
        {
          $match: {userId, category: budget.category,date: { $gte: startDate, $lte: endDate }}
        },
        {
          $group: { _id: null,totalSpent: { $sum: "$amount" }}            
        }
      ]);
      const spent = expenses[0]?.totalSpent || 0;
      const limit = budget.monthlyBudget;
      const percent = limit > 0 ? (spent / limit) * 100 : 0;
      let riskLevel = "LOW";
      let message = "Spending is under control";
      if (percent > 100) {
        riskLevel = "OVER";
        message = "You exceeded your budget!";
      } else if (percent > 90) {
        riskLevel = "HIGH";
        message = "You are very close to budget limit";
      } else if (percent > 70) {
        riskLevel = "MEDIUM";
        message = "Moderate spending detected";
      }
      // Save or update risk record
      await Risk.findOneAndUpdate(
        { userId, category: budget.category, month: m, year: y },
        {
          userId,
          category: budget.category,
          month: m,
          year: y,
          spent,
          budget: limit,
          percent,
          riskLevel,
          message
        },
        { upsert: true, new: true }
      );

      result.push({
        category: budget.category,
        spent,
        budget: limit,
        percent,
        riskLevel,
        message
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};