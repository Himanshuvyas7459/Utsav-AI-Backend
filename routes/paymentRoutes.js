import express from "express";
import { forAuthUsers } from "../middlewares/authMiddelware.js";
import paymentController from "../controllers/paymentController.js";

const router = express.Router();
const { createOrder } = paymentController;

// Create Payment Order
router.post("/create-order", forAuthUsers, createOrder);

export default router;