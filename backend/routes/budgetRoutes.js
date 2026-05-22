import {createBudget,updateBudget,getBudgetStatus} from "../controllers/budgetController.js"
import auth from "../middleware/authMiddleware.js";
import express from "express"
const router = express.Router();
router.post("/",auth,createBudget)
router.put("/",auth,updateBudget)
router.get("/status", auth, getBudgetStatus);
export default router