import Event from "../models/eventModel.js"
import Booking from "../models/bookingModel.js"

const getOrganizerDashboard = async (req, res) => {
  try {

    const organizerId = req.user._id

    // Events created by organizer
    const events = await Event.find({ organizer: organizerId })

    const eventIds = events.map(event => event._id)

    // Bookings for these events
    const bookings = await Booking.find({
      event: { $in: eventIds }
    }).populate("event")

    let revenue = 0

    bookings.forEach(b => {
      if (b.event?.price) {
        revenue += b.event.price * b.tickets
      }
    })

    res.json({
      totalEvents: events.length,
      totalBookings: bookings.length,
      revenue,
      events
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const organizerController = { getOrganizerDashboard }

export default organizerController