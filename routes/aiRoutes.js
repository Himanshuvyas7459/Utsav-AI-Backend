import express from "express";
import aiController from "../controllers/aiController.js";
import { forAuthUsers, forOrganizer, forAdmin } from "../middlewares/authMiddelware.js";

const router = express.Router();
const { generateEventPlan } = aiController;

// sirf logged-in users use kar sakte hain
router.post("/generate-plan", forOrganizer, generateEventPlan);

export default router;