import Booking from "../models/bookingModel.js"
import Event from "../models/eventModel.js"
import User from "../models/userModel.js"

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const bookings = await Booking.find().populate("event");

    let revenue = 0;

    bookings.forEach((b) => {
      if (b.event && b.event.price && b.tickets) {
        revenue += b.event.price * b.tickets;
      }
    });

    revenue = Number(revenue.toFixed(2));

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalEvents,
      totalBookings,
      revenue,
      recentUsers,
      recentEvents,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAdminAnalytics = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments()
    const totalEvents = await Event.countDocuments()
    const totalBookings = await Booking.countDocuments()

    const bookings = await Booking.find().populate("event")

    let revenue = 0

    bookings.forEach(b => {
      if (b.event?.price) {
        revenue += b.event.price * b.tickets
      }
    })

    const popularEvents = await Booking.aggregate([
      {
        $group: {
          _id: "$event",
          totalBookings: { $sum: "$tickets" }
        }
      },
      {
        $sort: { totalBookings: -1 }
      },
      {
        $limit: 5
      }
    ])

    res.json({
      totalUsers,
      totalEvents,
      totalBookings,
      revenue,
      popularEvents
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const adminController = {getDashboardStats , getAdminAnalytics}

export default adminController