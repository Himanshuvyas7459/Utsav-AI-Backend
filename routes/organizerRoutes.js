import express from "express";
import organizerController from "../controllers/organizerController.js";
import { forOrganizer } from "../middlewares/authMiddelware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();
const { getOrganizerDashboard } = organizerController;

// Organizer Dashboard
router.get("/dashboard", forOrganizer, authorizeRoles("organizer"), getOrganizerDashboard);

export default router;