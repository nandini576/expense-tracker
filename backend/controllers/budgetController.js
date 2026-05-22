import mongoose from "mongoose";
import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";


// ========================
// CREATE BUDGET
// ========================
export const createBudget = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const { category, monthlyBudget, month, year } = req.body;

    const m = Number(month);
    const y = Number(year);

    const existing = await Budget.findOne({
      userId,
      category,
      month: m,
      year: y
    });

    if (existing) {
      return res.status(400).json({
        msg: "Budget already exists. Use update API"
      });
    }

    const budget = await Budget.create({
      userId,
      category,
      monthlyBudget,
      month: m,
      year: y
    });

    res.status(201).json({
      msg: "Budget created",
      budget
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ========================
// UPDATE BUDGET
// ========================
export const updateBudget = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const { category, monthlyBudget, month, year } = req.body;

    const m = Number(month);
    const y = Number(year);

    const budget = await Budget.findOne({
      userId,
      category,
      month: m,
      year: y
    });

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found. Create it first"
      });
    }

    budget.monthlyBudget = monthlyBudget;
    await budget.save();

    res.json({
      message: "Budget updated",
      budget
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ========================
// GET BUDGET STATUS
// ========================
export const getBudgetStatus = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const m = Number(req.query.month);
    const y = Number(req.query.year);

    if (!m || !y || isNaN(m) || isNaN(y)) {
      return res.status(400).json({
        msg: "month and year are required"
      });
    }

    const budgets = await Budget.find({
      userId,
      month: m,
      year: y
    });

    const result = [];

    const startDate = new Date(y, m - 1, 1);
    const endDate = new Date(y, m, 0);

    for (let budget of budgets) {

      const expenses = await Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(req.user.id),
            category: budget.category,
            date: {
              $gte: startDate,
              $lte: endDate
            }
          }
        },
        {
          $group: {
            _id: null,
            totalSpent: { $sum: "$amount" }
          }
        }
      ]);

      const spent = expenses[0]?.totalSpent || 0;

      result.push({
        category: budget.category,
        budget: budget.monthlyBudget,
        spent,
        remaining: budget.monthlyBudget - spent,
        status: spent > budget.monthlyBudget ? "OVER BUDGET" : "OK"
      });
    }

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message
    });
  }
};