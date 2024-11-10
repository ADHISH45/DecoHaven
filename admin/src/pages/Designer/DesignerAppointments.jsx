import React, { useContext, useEffect } from 'react';
import { DesignerContext } from '../../context/DesignerContext';

const DesignerAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DesignerContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <h2 className="text-3xl font-bold text-white mb-6">My Appointments</h2>
      {appointments && appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="p-6 bg-white rounded-lg shadow-md border border-gray-200 transform transition duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-indigo-700">
                Appointment with {appointment.userData?.name || 'N/A'}
              </h3>
              <div className="mt-4 space-y-2 text-gray-700">
                <p className="text-lg">
                  <span className="font-medium text-gray-900">User Name:</span> {appointment.userData?.name}
                </p>
                <p className="text-lg">
                  <span className="font-medium text-gray-900">User Address:</span> {appointment.userData?.address}
                </p>
                <p className="text-lg">
                  <span className="font-medium text-gray-900">Date:</span> {appointment.slotDate}
                </p>
                <p className="text-lg">
                  <span className="font-medium text-gray-900">Time:</span> {appointment.slotTime}
                </p>
                <p className="text-lg">
                  <span className="font-medium text-gray-900">Payment Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-white ${appointment.isPaid ? 'bg-green-500' : 'bg-red-500'}`}>
                    {appointment.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </p>
              </div>

              {/* Status and Action Buttons */}
              {appointment.cancelled ? (
                <div className="mt-4 p-2 bg-red-100 border-l-4 border-red-500 text-red-700 font-semibold rounded">
                  Cancelled
                </div>
              ) : appointment.isCompleted ? (
                <div className="mt-4 p-2 bg-green-100 border-l-4 border-green-500 text-green-700 font-semibold rounded">
                  Completed
                </div>
              ) : (
                <div className="mt-6 flex space-x-3">
                  <button
                    className="px-4 py-2 font-semibold bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-md hover:from-green-500 hover:to-green-700"
                    onClick={() => completeAppointment(appointment._id)}
                  >
                    Mark as Complete
                  </button>
                  <button
                    className="px-4 py-2 font-semibold bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg shadow-md hover:from-red-500 hover:to-red-700"
                    onClick={() => cancelAppointment(appointment._id)}
                  >
                    Cancel Appointment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-white mt-4">No appointments available.</p>
      )}
    </div>
  );
};

export default DesignerAppointments;
