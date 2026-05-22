import express from "express";
import auth from "../middleware/authMiddleware.js";
import { calculateRisk } from "../controllers/riskController.js";

const router = express.Router();

router.get("/calculate", auth, calculateRisk);

export default router;