import cloudinary from "../config/cloudinary.js";
import Event from "../models/eventModel.js"
import Booking from "../models/bookingModel.js"

// const createEvent = async (req, res) => {
//   try {
//     const { title, description, date, time, location, price, capacity } = req.body;

//     if (!title || !description || !date || !location || !price || !time || !capacity) {
//       return res.status(400).json({
//         message: "Please fill all fields!",
//       });
//     }

//     let imageUrl = "";

//     // Upload to Cloudinary FIRST
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "utsav-ai-events",
//       });

//       imageUrl = result.secure_url;
//     }

//     // Create event WITH image
//     const event = await Event.create({
//       title,
//       description,
//       date,
//       time,
//       location,
//       price,
//       capacity,
//       organizer: req.user._id,
//       image: imageUrl
//     });

//     res.status(201).json({
//       message: "Event Created",
//       event,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, price, capacity } = req.body;

    if (!title || !description || !date || !location || !price || !time || !capacity) {
      return res.status(400).json({
        message: "Please fill all fields!",
      });
    }

    let imageUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "utsav-ai-events" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      price,
      capacity,
      organizer: req.user._id,
      image: imageUrl,
    });

    res.status(201).json({
      message: "Event Created",
      event,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getEvents = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5

        const skip = (page - 1) * limit

        const total = await Event.countDocuments()

        const events = await Event.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })

        res.json({
            page,
            totalPages: Math.ceil(total / limit),
            totalEvents: total,
            events
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getSingleEvent = async(req , res) => {
    try {
        const event = await Event.findById(req.params.id)
        .populate("organizer" , "name email")

     if(!event){
            return res.status(404).json({
                message:"Event not found!"
            })
        }

        res.json(event)

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
    console.log(res.data)
}

const updateEvent = async(req , res)=>{
    try{

        const event = await Event.findById(req.params.id)

        if(!event){
            return res.status(404).json({
                message:"Event not found"
            })
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.json({
            message:"Event updated",
            updatedEvent
        })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const deleteEvent = async(req , res)=>{
    try{

        const event = await Event.findById(req.params.id)

        if(!event){
            return res.status(404).json({
                message:"Event not found"
            })
        }

        await event.deleteOne()

        res.json({
            message:"Event deleted successfully"
        })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const getAllEventsAdmin = async(req,res)=>{
    try{
        const events = await Event.find()
        .populate("organizer","name email")

        res.json(events)

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const searchEvents = async (req,res) => {
    try {

        const {location , minPrice , maxPrice} = req.query

        const query = {}

        if(location){
            query.location = {$regex : location , $options : "i"}
        }

        if(minPrice && maxPrice){
            query.price = {$gte : minPrice , $lte : maxPrice}
        }

        const events = await Event.find(query)

        res.json({
            total : events.length,
            events
        })

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

const getMyEvents = async (req,res)=>{
    try {

        const events = await Event.find({
            organizer : req.user._id
        })

        res.json({
            total : events.length,
            events
        })

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

const getEventAnalytics = async (req, res) => {
    try {

        const events = await Event.find({
            organizer: req.user._id
        })

        const eventIds = events.map(event => event._id)

        const bookings = await Booking.find({
            event: { $in: eventIds }
        })

        let totalRevenue = 0

        bookings.forEach(b => {
            totalRevenue += b.tickets * b.price
        })

        res.json({
            totalEvents: events.length,
            totalBookings: bookings.length,
            totalRevenue
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const eventController = {createEvent , getEvents , getSingleEvent , updateEvent , deleteEvent , getAllEventsAdmin , searchEvents , getMyEvents , getEventAnalytics}

export default eventController
