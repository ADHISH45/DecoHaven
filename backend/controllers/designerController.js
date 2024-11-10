import designerModel from "../models/designerModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";

// Fetch list of designers without sensitive data
const designerList = async (req, res) => {
    try {
        const designers = await designerModel.find({}).select(['-password', '-email']);
        res.json({ success: true, designers });
    } catch (error) {
        console.error("Error fetching designers:", error);
        res.json({ success: false, message: error.message });
    }
};

// Designer login API
const loginDesigner = async (req, res) => {
    try {
        const { email, password } = req.body;
        const designer = await designerModel.findOne({ email });

        if (!designer) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, designer.password);
        if (isMatch) {
            const token = jwt.sign({ id: designer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error("Error during designer login:", error);
        res.json({ success: false, message: error.message });
    }
};

// Get appointments for the designer in the Designer Panel
const appointmentsDesigner = async (req, res) => {
    try {
        const desId = req.designerId;

        if (!desId) {
            return res.status(400).json({ success: false, message: "Designer ID is required." });
        }

        const appointments = await appointmentModel.find({ desId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log("Error fetching appointments:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Complete an appointment
const appointmentComplete = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const designerId = req.designerId;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.desId.toString() === designerId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            res.json({ success: true, message: 'Appointment completed' });
        } else {
            res.json({ success: false, message: 'Failed to complete: Appointment not found or unauthorized' });
        }
    } catch (error) {
        console.error("Error completing appointment:", error);
        res.json({ success: false, message: error.message });
    }
};

// Cancel an appointment
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const designerId = req.designerId;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.desId.toString() === designerId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            res.json({ success: true, message: 'Appointment cancelled' });
        } else {
            res.json({ success: false, message: 'Failed to cancel: Appointment not found or unauthorized' });
        }
    } catch (error) {
        console.error("Error cancelling appointment:", error);
        res.json({ success: false, message: error.message });
    }
};

// API to get dashboard data for designer panel
const designerDashboard = async (req, res) => {
    try {
        const designerId = req.designerId;
        const appointments = await appointmentModel.find({ desId: designerId });

        let users = [];
        appointments.forEach((item) => {
            if (!users.includes(item.userId)) {
                users.push(item.userId);
            }
        });

        const dashData = {
            appointments: appointments.length,
            users: users.length,
            latestAppointment: appointments.reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Designer Profile
const designerProfile = async (req, res) => {
    try {
        const designerId = req.designerId;
        const profileData = await designerModel.findById(designerId).select('-password');

        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update Designer Profile
const updateDesignerProfile = async (req, res) => {
    try {
        const designerId = req.designerId;
        const { name, speciality, email, about, experience } = req.body;

        let updatedImage = req.body.image;
        if (req.file) {
            updatedImage = req.file.path;
        }

        const updatedProfile = await designerModel.findByIdAndUpdate(designerId, {
            name,
            speciality,
            email,
            about,
            experience,
            image: updatedImage || undefined,
        }, { new: true });

        res.json({ success: true, message: 'Profile Updated', profileData: updatedProfile });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    designerList,
    loginDesigner,
    appointmentsDesigner,
    appointmentComplete,
    appointmentCancel,
    designerDashboard,
    designerProfile,
    updateDesignerProfile
};
