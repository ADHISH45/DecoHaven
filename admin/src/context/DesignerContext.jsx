import { useState, useEffect, createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const DesignerContext = createContext();

const DesignerContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(null);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (dToken) {
            localStorage.setItem('dToken', dToken);
        } else {
            localStorage.removeItem('dToken');
        }
    }, [dToken]);

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/designer/appointments`, { headers: { dToken } });
            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/designer/complete-appointment`, { appointmentId }, { headers: { dToken } });
            if (data.success) {
                toast.success("Appointment completed successfully.");
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/designer/cancel-appointment`, { appointmentId }, { headers: { dToken } });
            if (data.success) {
                toast.success("Appointment canceled successfully.");
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/designer/dashboard`, { headers: { dToken } });
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/designer/profile`, { headers: { dToken } });
            if (data.success) {
                setProfileData(data.profileData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const updateProfile = async (updatedData) => {
        try {
            const formData = new FormData();
            Object.entries(updatedData).forEach(([key, value]) => {
                if (value !== undefined) formData.append(key, value);
            });

            const { data } = await axios.put(`${backendUrl}/api/designer/update-profile`, formData, {
                headers: {
                    dToken,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (data.success) {
                toast.success('Profile updated successfully!');
                setProfileData(data.profileData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const value = {
        dToken,
        setDToken,
        backendUrl,
        getAppointments,
        appointments,
        completeAppointment,
        cancelAppointment,
        dashData,
        getDashData,
        profileData,
        getProfileData,
        updateProfile,setProfileData
    };

    return (
        <DesignerContext.Provider value={value}>
            {props.children}
        </DesignerContext.Provider>
    );
};

export default DesignerContextProvider;
