import Razorpay from "razorpay"
import sendEmail from "../utils/sendEmail.js"
import User from "../models/userModel.js"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createOrder = async (req, res) => {

  try {

    const { amount } = req.body

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_rcptid_" + Date.now()
    }

    const order = await razorpay.orders.create(options)

    res.json(order)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }

  const user = await User.findById(req.user._id)
  
  await sendEmail(
    user.email,
    "Booking Confirmed - Utsav AI",
    "Your event booking has been confirmed 🎉"
  )
}



const paymentController = { createOrder }

export default paymentController