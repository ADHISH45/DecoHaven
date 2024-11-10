import { useContext, useEffect } from 'react';
import React from 'react';
import { DesignerContext } from '../../context/DesignerContext';

const DesignerDashboard = () => {
  const { dToken, dashData, setDashData, getDashData } = useContext(DesignerContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Designer Dashboard</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Appointments */}
          <div className="p-6 bg-blue-500 text-white rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Total Appointments</h3>
              <p className="text-4xl">{dashData.appointments}</p>
            </div>
            <div className="text-6xl">📅</div>
          </div>

          {/* Total Users */}
          <div className="p-6 bg-green-500 text-white rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Total Users</h3>
              <p className="text-4xl">{dashData.users}</p>
            </div>
            <div className="text-6xl">👥</div>
          </div>

          {/* Latest Appointments */}
          <div className="p-6 bg-yellow-500 text-white rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Latest Appointments</h3>
              <ul className="space-y-2">
                {dashData.latestAppointment.map((appointment) => (
                  <li key={appointment._id} className="text-xl">
                    <p><span className="font-semibold">User:</span> {appointment.userData?.name || 'N/A'}</p>
                    <p><span className="font-semibold">Date:</span> {appointment.slotDate}</p>
                    <p><span className="font-semibold">Time:</span> {appointment.slotTime}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-6xl">📝</div>
          </div>
        </div>

        {/* Optional: Additional Styling for Latest Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Latest Appointments</h3>
          <ul className="space-y-4">
            {dashData.latestAppointment.map((appointment) => (
              <li key={appointment._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold">{appointment.userData?.name || 'N/A'}</h4>
                <p><span className="font-medium">Date:</span> {appointment.slotDate}</p>
                <p><span className="font-medium">Time:</span> {appointment.slotTime}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default DesignerDashboard;
