import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId); // Call the function from context
    } catch (error) {
      toast.error('Error during cancellation.');
      console.error('Error during cancellation:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Appointments</h2>
      {appointments && appointments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Appointment ID: {appointment._id}
              </h3>
              <div className="mt-2 space-y-1 text-gray-700 text-sm">
                <p><span className="font-medium">User ID:</span> {appointment.userId}</p>
                <p><span className="font-medium">User Name:</span> {appointment.userData?.name || 'N/A'}</p>
                <p><span className="font-medium">User Email:</span> {appointment.userData?.email || 'N/A'}</p>
                <p><span className="font-medium">Designer ID:</span> {appointment.desId}</p>
                <p><span className="font-medium">Designer Name:</span> {appointment.desData?.name || 'N/A'}</p>
                <p><span className="font-medium">Designer Specialty:</span> {appointment.desData?.speciality || 'N/A'}</p>
                <p><span className="font-medium">Slot Date:</span> {appointment.slotDate}</p>
                <p><span className="font-medium">Slot Time:</span> {appointment.slotTime}</p>

                {/* Show Cancelled or Completed status */}
                {appointment.cancelled && (
                  <p className="mt-2 text-white bg-red-600 p-2 rounded-md">
                    <span className="font-medium">Status:</span> Cancelled
                  </p>
                )}
                {appointment.isCompleted && !appointment.cancelled && (
                  <p className="mt-2 text-white bg-green-600 p-2 rounded-md">
                    <span className="font-medium">Status:</span> Completed
                  </p>
                )}

                {/* Hide Cancel button if completed or cancelled */}
                {!appointment.cancelled && !appointment.isCompleted && (
                  <button
                    onClick={() => handleCancelAppointment(appointment._id)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No appointments available.</p>
      )}
    </div>
  );
};

export default AllAppointments;
