import express from "express";
import reviewController from "../controllers/reviewController.js";
import { forAuthUsers } from "../middlewares/authMiddelware.js";

const router = express.Router();
const { createReview, getEventReviews } = reviewController;

// Create Review
router.post("/create", forAuthUsers, createReview);

// Get Reviews for Event
router.get("/event/:eventId", getEventReviews);

export default router;