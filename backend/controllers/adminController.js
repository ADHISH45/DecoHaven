import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import designerModel from "../models/designerModel.js";
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// API for adding Designer
const addDesigner = async (req, res) => {
  try {
    const { name, email, password, speciality, experience, about } = req.body;
    const imageFile = req.file;

    // Checking for all required fields
    if (!name || !email || !password || !speciality || !experience || !about) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate name (check if it's a string and has a length greater than 2 characters)
    if (!validator.isLength(name, { min: 3 })) {
      return res.status(400).json({ success: false, message: "Name must be at least 3 characters long" });
    }

    // Validate email using the validator package
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Validate password (ensure it's at least 6 characters long)
    if (!validator.isLength(password, { min: 6 })) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    // Validate experience (must be a positive integer)
    if (!validator.isInt(experience, { min: 0 })) {
      return res.status(400).json({ success: false, message: "Experience must be a positive number" });
    }

    // Optionally, validate the about field (e.g., ensure it's a non-empty string)
    if (!validator.isLength(about, { min: 10 })) {
      return res.status(400).json({ success: false, message: "About section must be at least 10 characters long" });
    }

    // Optionally, you can validate the image file if required (e.g., check if a file is uploaded)
    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10; // Number of salt rounds (10 is a common value)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const designerData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      experience,
      about
    };

    const newDesigner = new designerModel(designerData);
    await newDesigner.save();

    res.json({ success: true, message: "Designer added" });

  } catch (error) {
    // Handle errors and send a meaningful response
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// API for admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// API to get all designers
const allDesigners = async (req, res) => {
  try {
    const designers = await designerModel.find({}).select('-password');
    res.json({ success: true, designers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel an appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Find the appointment by ID
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Update the 'cancelled' field to true
    appointment.cancelled = true;
    await appointment.save();

    return res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
//API to get Admin dashboard
const adminDashboard = async (req,res) => {
  try {
    const designers = await designerModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      designers: designers.length,
      appointments:appointments.length,
      Users:users.length,
      latestAppointment: appointments.reverse().slice(0,5)
    }
    res.json({success:true,dashData})


  } catch (error) {
    console.log(error);
   res.status(500).json({ success: false, message: error.message });
 
  }
}

export { addDesigner, loginAdmin, allDesigners, appointmentsAdmin, cancelAppointment,adminDashboard};
