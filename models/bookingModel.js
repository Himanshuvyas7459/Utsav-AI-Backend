import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    event : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    tickets : {
        type : Number,
        default : 1
    }
},{
    timestamps : true
})

const Booking = mongoose.model("Booking" , bookingSchema)

export default Booking