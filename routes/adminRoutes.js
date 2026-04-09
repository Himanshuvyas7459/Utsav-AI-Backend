import express from "express";
import adminController from "../controllers/adminController.js";
import { forAuthUsers, forOrganizer, forAdmin } from "../middlewares/authMiddelware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();
const { getDashboardStats, getAdminAnalytics } = adminController;

// Admin Dashboard
router.get("/dashboard", forAuthUsers, authorizeRoles("admin"), getDashboardStats);
router.get("/analytics", forAuthUsers, authorizeRoles("admin"), getAdminAnalytics);

export default router;