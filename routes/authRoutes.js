import express from "express";
import authController from "../controllers/authController.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { forAuthUsers, forOrganizer, forAdmin } from "../middlewares/authMiddelware.js";

const router = express.Router();

const { registerUser, loginUser, getAllUsers, verifyOrganizer } = authController;

// PUBLIC ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

// FOR ADMIN
router.get("/users", forAdmin, authorizeRoles("admin"), getAllUsers);
router.put("/verify/:id", forAdmin, authorizeRoles("admin"), verifyOrganizer);

export default router;