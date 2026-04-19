import User from "../models/userModel.js";
import OrganizerRequest from "../models/organizerRequestModel.js";
import Event from "../models/eventModel.js";
import Booking from "../models/bookingModel.js";

// ================= USER =================

// Request to become organizer
const requestOrganizer = async (req, res) => {
  try {
    const userId = req.user._id;

    // check if already requested
    const existing = await OrganizerRequest.findOne({ user: userId });

    if (existing) {
      return res.status(400).json({
        message: "You already requested",
      });
    }

    const request = await OrganizerRequest.create({
      user: userId,
      status: "pending",
    });

    res.status(201).json({
      message: "Request sent successfully",
      request,
    });

  } catch (error) {
    console.log("REQUEST ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= ADMIN =================

// Get all organizer requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await OrganizerRequest.find({ status: "pending" })
      .populate("user", "name email");

    res.json(requests);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Approve request
const approveRequest = async (req, res) => {
  try {
    const request = await OrganizerRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    const user = await User.findById(request.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = "organizer";
    await user.save();

    request.status = "approved";
    await request.save();

    res.json({
      message: "Organizer approved successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Reject request
const rejectRequest = async (req, res) => {
  try {
    const request = await OrganizerRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "rejected";
    await request.save();

    res.json({
      message: "Request rejected",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= ORGANIZER =================

// Organizer Dashboard
const getOrganizerDashboard = async (req, res) => {
  try {
    const organizerId = req.user._id;

    const events = await Event.find({ organizer: organizerId });
    const eventIds = events.map(event => event._id);

    const bookings = await Booking.find({
      event: { $in: eventIds },
    }).populate("event");

    let revenue = 0;

    bookings.forEach(b => {
      if (b.event?.price) {
        revenue += b.event.price * b.tickets;
      }
    });

    res.json({
      totalEvents: events.length,
      totalBookings: bookings.length,
      revenue,
      events,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const organizerController = {
  requestOrganizer,
  getAllRequests,
  approveRequest,
  rejectRequest,
  getOrganizerDashboard,
};

export default organizerController;




// import User from "../models/userModel.js";
// import OrganizerRequest from "../models/organizerRequestModel.js";

// // ================= USER =================

// // Request to become organizer

// const requestOrganizer = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     // check already requested
//     const existing = await OrganizerRequest.findOne({ user: userId });

//     if (existing) {
//       return res.status(400).json({
//         message: "You already requested",
//       });
//     }

//     // create request
//     const request = await OrganizerRequest.create({
//       user: userId,
//       status: "pending",
//     });

//     res.status(201).json({
//       message: "Request sent successfully",
//       request,
//     });

//   } catch (error) {
//     console.log("REQUEST ERROR:", error);
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // ================= ADMIN =================

// // Get all requests
// const getAllRequests = async (req, res) => {
//   try {
//     const users = await User.find({
//       organizerRequestStatus: "pending",
//     }).select("-password");

//     res.json(users);

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // Approve request
// const approveRequest = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     user.role = "organizer";
//     user.organizerRequestStatus = "approved";

//     await user.save();

//     res.json({
//       message: "Organizer approved successfully",
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // Reject request
// const rejectRequest = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     user.organizerRequestStatus = "rejected";

//     await user.save();

//     res.json({
//       message: "Request rejected",
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // ================= ORGANIZER =================

// // Dashboard (already tera tha)
// import Event from "../models/eventModel.js";
// import Booking from "../models/bookingModel.js";

// const getOrganizerDashboard = async (req, res) => {
//   try {
//     const organizerId = req.user._id;

//     const events = await Event.find({ organizer: organizerId });
//     const eventIds = events.map(event => event._id);

//     const bookings = await Booking.find({
//       event: { $in: eventIds },
//     }).populate("event");

//     let revenue = 0;

//     bookings.forEach(b => {
//       if (b.event?.price) {
//         revenue += b.event.price * b.tickets;
//       }
//     });

//     res.json({
//       totalEvents: events.length,
//       totalBookings: bookings.length,
//       revenue,
//       events,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// const organizerController = {
//   requestOrganizer,
//   getAllRequests,
//   approveRequest,
//   rejectRequest,
//   getOrganizerDashboard,
// };

// export default organizerController;

// import Event from "../models/eventModel.js";
// import Booking from "../models/bookingModel.js";
// import userModel from "../models/userModel.js";
// import organizerRequest from "../models/organizerRequest.js";


// // ================= USER =================

// // Request to become organizer
// export const requestOrganizer = async (req, res) => {
//   try {
//     //  Only attendees can request
//     if (req.user.role !== "attendee") {
//       return res.status(400).json({
//         message: "Only attendees can request organizer access"
//       });
//     }

//     // check if already requested
//     const existing = await organizerRequest.findOne({ user: req.user._id });

//     if (existing) {
//       return res.status(400).json({
//         message: "Request already exists"
//       });
//     }

//     // create request
//     const request = await organizerRequest.create({
//       user: req.user._id
//     });

//     res.json({
//       message: "Organizer request sent",
//       request
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // ================= ADMIN =================

// // Get all requests
// export const getAllRequests = async (req, res) => {
//   try {
//     const requests = await organizerRequest.find()
//       .populate("user", "name email");

//     res.json(requests);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // Approve request
// export const approveRequest = async (req, res) => {
//   try {
//     const request = await organizerRequest.findById(req.params.id);

//     if (!request) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     request.status = "approved";
//     await request.save();

//     // update user role
//     await userModel.findByIdAndUpdate(request.user, {
//       role: "organizer",
//       organizerRequestStatus: "approved"
//     });

//     res.json({ message: "Request approved" });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // Reject request
// export const rejectRequest = async (req, res) => {
//   try {
//     const request = await organizerRequest.findById(req.params.id);

//     if (!request) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     request.status = "rejected";
//     await request.save();

//     await User.findByIdAndUpdate(request.user, {
//       organizerRequestStatus: "rejected"
//     });

//     res.json({ message: "Request rejected" });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // ================= ORGANIZER =================

// // Dashboard
// export const getOrganizerDashboard = async (req, res) => {
//   try {

//     const organizerId = req.user._id;

//     const events = await Event.find({ organizer: organizerId });

//     const eventIds = events.map(event => event._id);

//     const bookings = await Booking.find({
//       event: { $in: eventIds }
//     }).populate("event");

//     let revenue = 0;

//     bookings.forEach(b => {
//       if (b.event?.price) {
//         revenue += b.event.price * b.tickets;
//       }
//     });

//     res.json({
//       totalEvents: events.length,
//       totalBookings: bookings.length,
//       revenue,
//       events
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };


// const organizerController = {
//   requestOrganizer,
//   getAllRequests,
//   approveRequest,
//   rejectRequest,
//   getOrganizerDashboard
// };

// export default organizerController;









// // import Event from "../models/eventModel.js"
// // import Booking from "../models/bookingModel.js"

// // const getOrganizerDashboard = async (req, res) => {
// //   try {

// //     const organizerId = req.user._id

// //     // Events created by organizer
// //     const events = await Event.find({ organizer: organizerId })

// //     const eventIds = events.map(event => event._id)

// //     // Bookings for these events
// //     const bookings = await Booking.find({
// //       event: { $in: eventIds }
// //     }).populate("event")

// //     let revenue = 0

// //     bookings.forEach(b => {
// //       if (b.event?.price) {
// //         revenue += b.event.price * b.tickets
// //       }
// //     })

// //     res.json({
// //       totalEvents: events.length,
// //       totalBookings: bookings.length,
// //       revenue,
// //       events
// //     })

// //   } catch (error) {
// //     res.status(500).json({
// //       message: error.message
// //     })
// //   }
// // }

// // const organizerController = { getOrganizerDashboard }

// // export default organizerController