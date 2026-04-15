import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    role: {
      type: String,
      enum: ["attendee", "organizer", "admin"],
      default: "attendee"
    },

    // 🔥 NEW: track organizer request status
    organizerRequestStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none"
    },

    // optional profile fields (future use)
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);








// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({

//     name : {
//         type : String,
//         required : true
//     },
//     email : {
//         type : String,
//         required : true,
//         unique : true
//     },
//     // phone : {
//     //     type : String,
//     //     unique : true
//     // },
//     password : {
//         type : String,
//         unique : true
//     },
//     role : {
//         type : String,
//         enum : ["admin" , "organizer" , "attendee"],
//         default : "attendee",
//         required : true
//     },
//     // address : {
//     //     type : String,
//     //     required : true
//     // },
//     // isActive : {
//     //     type : Boolean,
//     //     required : true,
//     //     default : true
//     // },
//     // isVerified:{
//     //     type:Boolean,
//     //     default:false
//     // }


// },{
//     timestamps : true
// })

// const User = mongoose.model( "User" , userSchema);

// export default User