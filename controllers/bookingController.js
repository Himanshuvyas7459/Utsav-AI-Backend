import Booking from "../models/bookingModel.js";
import { sendTicket } from "../utils/sendTicket.js";

const bookEvent = async (req, res) => {
  try {
    const { eventId, tickets } = req.body;

    if (!eventId) {
      return res.status(400).json({
        message: "Event ID is required",
      });
    }

    // CREATE BOOKING
    let booking = await Booking.create({
      event: eventId,
      user: req.user._id,
      tickets,
    });

    // IMPORTANT: populate event (warna email me data missing hoga)
    booking = await booking.populate("event");

    // SEND EMAIL (background me chalega)
    sendTicket(req.user.email, booking);

    res.status(201).json({
      message: "Event Booked Successfully!",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json({
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const bookingController = { bookEvent, getMyBookings };

export default bookingController;