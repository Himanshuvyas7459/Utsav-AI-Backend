import express from "express";
import connectDB from "./config/dbconfig.js";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

// Local Imports
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import organizerRoutes from "./routes/organizerRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// DB CONNECTION
connectDB();

//  RATE LIMITING (GLOBAL PROTECTION)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // max 100 requests per IP
  message: "Too many requests, please try again later"
});

// apply limiter to all API routes
app.use("/api", limiter);

// CORS
app.use(cors({
  origin: [
    "https://utsav-ai.vercel.app"
  ],
  credentials: true
}));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "WELCOME TO UTSAV AI EVENT MANAGEMENT API 1.0"
  });
});

// Error Handler
app.use(errorHandlerMiddleware);

app.listen(PORT, () =>
  console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue)
);









// import express from "express";
// import connectDB from "./config/dbconfig.js";
// import colors from "colors";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// // Local Imports
// import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
// import authRoutes from "./routes/authRoutes.js";
// import eventRoutes from "./routes/eventRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import organizerRoutes from "./routes/organizerRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// // DB CONNECTION
// connectDB();

// app.use(cors({
//   origin: [
//     "https://utsav-ai.vercel.app"
//   ],
//   credentials: true
// }));

// // Body Parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/events", eventRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/ai", aiRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/organizer", organizerRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/payments", paymentRoutes);

// // Root route
// app.get("/", (req, res) => {
//   res.json({
//     message: "WELCOME TO UTSAV AI EVENT MANAGEMENT API 1.0"
//   });
// });

// // Error Handler
// app.use(errorHandlerMiddleware);

// app.listen(PORT, () =>
//   console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue)
// );











// // import express from "express"
// // import connectDB from "./config/dbconfig.js"
// // import colors from "colors"
// // import cors from "cors"
// // import dotenv from "dotenv";
// // import path from "path";

// // dotenv.config({
// //   path: path.resolve(process.cwd(), "server/.env")
// // });

// // //Local Imports
// // import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js"
// // import authRoutes from "./routes/authRoutes.js"
// // import eventRoutes from "./routes/eventRoutes.js"
// // import bookingRoutes from "./routes/bookingRoutes.js"
// // import aiRoutes from "./routes/aiRoutes.js"
// // import adminRoutes from "./routes/adminRoutes.js"
// // import organizerRoutes from "./routes/organizerRoutes.js"
// // import reviewRoutes from "./routes/reviewRoutes.js"
// // import paymentRoutes from "./routes/paymentRoutes.js"

// // const app = express()
// // const PORT = process.env.PORT || 5000 

// // //DB CONNECTION 
// // connectDB()

// // app.use(cors({
// //   origin: "https://utsav-ai.vercel.app",
// //   credentials: true
// // }));

// // //Body Parser
// // app.use(express.json())
// // app.use(express.urlencoded({ extended: true }))

// // //AUTH ROUTES
// // app.use("/api/auth" , authRoutes)

// // //EVENT ROUTES
// // app.use("/api/events" , eventRoutes)

// // //BOOKING ROUTES
// // app.use("/api/bookings", bookingRoutes)

// // //AI ROUTES
// // app.use("/api/ai", aiRoutes)

// // //ADMIN ROUTES
// // app.use("/api/admin" , adminRoutes)

// // //ORGANIZER ROUTES
// // app.use("/api/organizer" , organizerRoutes)

// // //REVIEW ROUTES
// // app.use("/api/reviews" , reviewRoutes)

// // //PAYMENT 
// // app.use("/api/payments" , paymentRoutes)


// // app.get("/",(req,res)=>{
// //     res.json({
// //         message : "WELCOME TO UTSAV AI EVENT MANAGEMENT API 1.0"
// //     })
// // })

// // // Error Handler
// // app.use(errorHandlerMiddleware)

// // app.listen(PORT, ()=> console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue))
