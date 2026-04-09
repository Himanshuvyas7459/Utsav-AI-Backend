import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image: {
        type: String
    },
    date : {
        type : Date,
        required : true
    },
    time: {
      type: String,
      required: true,
    },
    location : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true        
    },
    capacity: {            
        type: Number,
        required: true
    },
    organizer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    attendees : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ]
},{
    timestamps : true
})

const Event = mongoose.model("Event" , eventSchema);

export default Event