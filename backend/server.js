import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import riskRoutes from "./routes/riskRoutes.js";
dotenv.config();
connectDB();
const app=express();
app.use(cors({
  origin: "https://expense-tracker-opal-six-75.vercel.app",
  credentials: true
}));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth",authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/risk", riskRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

