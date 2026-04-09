import express from "express";
import { forAuthUsers, forOrganizer, forAdmin } from "../middlewares/authMiddelware.js";
import bookingController from "../controllers/bookingController.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();
const { bookEvent, getMyBookings } = bookingController;

// BOOK EVENT (only attendee)
router.post("/book", forAuthUsers, authorizeRoles("attendee"), bookEvent);

// GET MY BOOKINGS (attendee)
router.get("/my-bookings", forAuthUsers, getMyBookings);

export default router;