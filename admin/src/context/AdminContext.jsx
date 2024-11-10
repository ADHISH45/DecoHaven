import React, { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

// Create the AdminContext
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [designers, setDesigners] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData,setDashData] = useState(false)

    // Access backend URL from environment variables
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDesigners = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-designers`, {}, { headers: { aToken } });
            if (data.success) {
                setDesigners(data.designers);
                console.log("Designers data:", data.designers);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error("Error fetching designers:", error);
        }
    };

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, { headers: { aToken } });
            console.log("API Response:", data);
            if (data.success) {
                setAppointments(data.appointments);
                console.log("Updated Appointments:", data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error("Error fetching appointments:", error);
        }
    };

    // Cancel an appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.put(`${backendUrl}/api/admin/cancel-appointment/${appointmentId}`, {}, {
                headers: { aToken }
            });

            if (data.success) {
                // Optionally update the appointments list after cancellation
                setAppointments(prevAppointments => 
                    prevAppointments.map(appointment =>
                        appointment._id === appointmentId ? { ...appointment, cancelled: true } : appointment
                    )
                );
                toast.success('Appointment cancelled successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error('Error cancelling the appointment:', error);
        }
    };

    const getDashData = async () =>{
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { headers: { aToken } });
            if (data.success) {
                setDashData(data.dashData);
                console.log(data.dashData)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Context value to be shared
    const value = {
        aToken,
        setAToken,
        backendUrl,
        designers,
        getAllDesigners,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment, // Added cancelAppointment function here
        dashData,getDashData
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
