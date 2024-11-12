import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import userModel from '../models/userModel.js';
import designerModel from '../models/designerModel.js';
import appointmentModel from '../models/appointmentModel.js';
import Appointment from '../models/appointmentModel.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Configure Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.VITE_RAZORPAY_KEY_ID,
    key_secret: process.env.VITE_RAZORPAY_SECRET_KEY
});

// Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, address, password } = req.body;

        if (!name || !email || !phoneNumber || !address || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a Valid Email" });
        }

        if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false })) {
            return res.json({ success: false, message: "Enter a Valid Phone Number" });
        }

        if (address.length < 10) {
            return res.json({ success: false, message: "Address must be at least 10 characters long" });
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { name, email, phoneNumber, address, password: hashedPassword };
        const newUser = new userModel(userData);

        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// API to log in user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user profile
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password');
        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phoneNumber, address } = req.body;
        const imageFile = req.file; // Access the uploaded file

        if (!name || !phoneNumber || !address) {
            return res.json({ success: false, message: "Data Missing" });
        }

        await userModel.findByIdAndUpdate(userId, { name, phoneNumber, address });

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageURL = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageURL });
        }

        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, desId, slotDate, slotTime } = req.body;

        const desData = await designerModel.findById(desId).select('-password');
        let slots_booked = desData.slots_booked;

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await userModel.findById(userId).select('-password');
        delete desData.slots_booked;

        const appointmentData = {
            userId,
            desId,
            userData,
            desData,
            slotTime,
            slotDate,
            date: Date.now(),
            cancelled: false
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();
        await designerModel.findByIdAndUpdate(desId, { slots_booked });

        res.json({ success: true, message: 'Appointment Booked' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to list user appointments
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' });
        }

        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { desId, slotDate, slotTime } = appointmentData;
        const designerData = await designerModel.findById(desId);
        let slots_booked = designerData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter((time) => time !== slotTime);
        await designerModel.findByIdAndUpdate(desId, { slots_booked });

        res.json({ success: true, message: 'Appointment Cancelled' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to create a Razorpay order for appointment payment
// API to verify Razorpay payment signature
// const verifyPayment = async (req, res) => {
//     try {
//         const { order_id, payment_id, signature, appointmentId } = req.body;

//         // Generate and verify signature using Razorpay's verification method
//         const generated_signature = crypto
//             .createHmac('sha256', process.env.REACT_APP_RAZORPAY_SECRET_KEY)
//             .update(`${order_id}|${payment_id}`)
//             .digest('hex');

//         if (generated_signature !== signature) {
//             return res.status(400).json({ success: false, message: "Payment verification failed" });
//         }

//         // Update appointment with payment details
//         await appointmentModel.findByIdAndUpdate(appointmentId, {
//             paymentDetails: {
//                 orderId: order_id,
//                 paymentId: payment_id,
//                 status: 'paid'
//             },
//             isPaid: true
//         });

//         res.json({ success: true, message: "Payment verified and saved successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Error verifying and saving payment" });
//     }
// };
// backend/controllers/appointmentController.js

    const getAppointmentDetails = async (req, res) => {
    const { appointmentId } = req.params; // Get appointmentId from URL parameters
  
    try {
      // Fetch the appointment by appointmentId
      const appointment = await Appointment.findById(appointmentId)
        .populate('userId', 'name email phone') // Populate user data (if necessary)
        .populate('desId', 'name specialty'); // Populate designer data (if necessary)
  
      if (!appointment) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
      }
  
      res.status(200).json({ success: true, appointment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error while fetching appointment details' });
    }
  };
  // controllers/userController.js
    const payByCash = async (req, res) => {
    const { appointmentId } = req.body;
    try {
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({ success: false, message: "Appointment not found" });
      }
  
      appointment.isPaid = true;
      await appointment.save();
  
      res.status(200).json({ success: true, message: "Payment marked as completed by cash." });
    } catch (error) {
      console.error("Error updating cash payment:", error);
      res.status(500).json({ success: false, message: "Server error while processing cash payment." });
    }
  };
  


export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    getAppointmentDetails,payByCash
}; 