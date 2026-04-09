import express from "express";

// Local Imports
import eventController from "../controllers/eventController.js"
import { forAuthUsers, forOrganizer, forAdmin } from "../middlewares/authMiddelware.js"
import authorizeRoles from "../middlewares/roleMiddleware.js"
import upload from "../middlewares/uploadMiddleware.js"

const router = express.Router()

const { 
  createEvent, 
  updateEvent, 
  deleteEvent, 
  getAllEventsAdmin, 
  searchEvents, 
  getEvents, 
  getSingleEvent, 
  getMyEvents, 
  getEventAnalytics 
} = eventController

// GET ALL EVENTS
router.get("/all", getEvents)

// SEARCH EVENTS
router.get("/search", forAuthUsers, searchEvents)

// ORGANIZER'S EVENTS
router.get("/my-events", forAuthUsers, authorizeRoles("organizer"), getMyEvents)

// EVENT ANALYTICS
router.get("/analytics", forAuthUsers, authorizeRoles("organizer"), getEventAnalytics)

// CREATE EVENT (with image upload)
router.post("/create", forOrganizer, authorizeRoles("organizer"), upload.single("image"), createEvent)

// UPDATE EVENT
router.put("/update/:id", forOrganizer, authorizeRoles("organizer"), updateEvent)

// DELETE EVENT
router.delete("/delete/:id", forOrganizer, authorizeRoles("organizer"), deleteEvent)

// ADMIN EVENTS
router.get("/admin/events", forAdmin, authorizeRoles("admin"), getAllEventsAdmin)

// GET SINGLE EVENT
router.get("/:id", getSingleEvent)

export default router