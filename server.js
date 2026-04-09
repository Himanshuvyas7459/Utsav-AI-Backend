import express from "express"
import connectDB from "./config/dbconfig.js"
import colors from "colors"
import cors from "cors"
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "server/.env")
});

//Local Imports
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js"
import authRoutes from "./routes/authRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import organizerRoutes from "./routes/organizerRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

const app = express()
const PORT = process.env.PORT || 5000 

//DB CONNECTION 
connectDB()

app.use(cors({
  origin: "*",
  // origin: "http://localhost:5173",
  // credentials: true
}));

//Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//AUTH ROUTES
app.use("/api/auth" , authRoutes)

//EVENT ROUTES
app.use("/api/events" , eventRoutes)

//BOOKING ROUTES
app.use("/api/bookings", bookingRoutes)

//AI ROUTES
app.use("/api/ai", aiRoutes)

//ADMIN ROUTES
app.use("/api/admin" , adminRoutes)

//ORGANIZER ROUTES
app.use("/api/organizer" , organizerRoutes)

//REVIEW ROUTES
app.use("/api/reviews" , reviewRoutes)

//ANALYTICS
app.use("/api/admin", adminRoutes)

//PAYMENT 
app.use("/api/payments" , paymentRoutes)


app.get("/",(req,res)=>{
    res.json({
        message : "WELCOME TO UTSAV AI EVENT MANAGEMENT API 1.0"
    })
})

// Error Handler
app.use(errorHandlerMiddleware)

app.listen(PORT, ()=> console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue))
