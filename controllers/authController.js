import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// LOCAL IMPORTS
import User from "../models/userModel.js"


// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password ) {
      return res.status(400).json({
        message: "Please fill all details",
      });
    }

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "attendee",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });

  } catch (error) {
    // console.log(error); 
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all details"
        })
    }

    try {
        const user = await User.findOne({ email })

    if (user && await bcrypt.compare(password, user.password)) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        })

    } else {
        res.status(401).json({
            message: "Invalid credentials"
        })
    }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// TOKEN GENERATOR
const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    )
}

// FETCH ALL USERS
const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find().select("-password")

        res.json(users)

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

// VERIFYING ORGANIZERS
const verifyOrganizer = async(req,res)=>{
    try{

        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        user.isVerified = true
        await user.save()

        res.json({
            message:"Organizer verified successfully"
        })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const authController = { registerUser , loginUser , getAllUsers , verifyOrganizer , generateToken }

export default authController