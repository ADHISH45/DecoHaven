import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error("Failed to load appointments");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching appointments");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, {
        headers: { token }
      });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handlePayOnline = (appointmentId) => {
    navigate(`/payment/${appointmentId}`);
  };

  const payByCash = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/pay-by-cash`, { appointmentId }, {
        headers: { token },
      });
      if (data.success) {
        toast.success("Payment marked as completed by cash.");
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error marking payment as completed:", error);
      toast.error("An error occurred while marking cash payment.");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
              <div className="flex items-center mb-4">
                <img
                  src={item.desData.image}
                  alt={item.desData.name || "Designer"}
                  className="w-20 h-20 object-cover rounded-full border-2 border-blue-500"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">{item.desData.name}</h3>
                  <p className="text-gray-600">{item.desData.speciality}</p>
                  <p className="text-gray-500">{item.desData.experience} years of experience</p>
                  <p className="text-xs mt-1">
                    <span className="text-sm text-neutral-700 font-medium">Date and Time:</span> {item.slotDate} | {item.slotTime}
                  </p>
                </div>
              </div>
              <div className="mt-auto flex justify-between">
                {item.cancelled ? (
                  <p className="text-red-600 font-semibold">Appointment Cancelled</p>
                ) : (
                  <>
                    {!item.isPaid && (
                      <button 
                        onClick={() => cancelAppointment(item._id)} 
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                      >
                        Cancel Appointment
                      </button>
                    )}
                    {!item.isPaid ? (
                      <>
                        <button 
                          onClick={() => handlePayOnline(item._id)} 
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                          Pay Fee Online
                        </button>
                        <button 
                          onClick={() => payByCash(item._id)} 
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                        >
                          Pay by Cash
                        </button>
                      </>
                    ) : (
                      <p className="text-green-600 font-semibold">Payment Completed</p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No appointments booked yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
