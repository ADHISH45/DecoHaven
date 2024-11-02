import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointments = () => {
  const { designers } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Appointments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {designers.slice(0, 2).map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
            <div className="flex items-center mb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-full border-2 border-blue-500" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">{item.speciality}</p>
                <p className="text-gray-500">{item.experience} years of experience</p>
              </div>
            </div>
            <div className="mt-auto flex justify-between">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
                Cancel Appointment
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Pay Fee Online
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
