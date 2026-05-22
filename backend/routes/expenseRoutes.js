import express from "express";
import auth from "../middleware/authMiddleware.js";
import { addExpense,getExpenses,deleteExpense } from "../controllers/expenseController.js";
const router = express.Router();
// protected routes
router.post("/", auth, addExpense);
router.get("/", auth, getExpenses);
router.delete("/:id", auth, deleteExpense);
export default router;