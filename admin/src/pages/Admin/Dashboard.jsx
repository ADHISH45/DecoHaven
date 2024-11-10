import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const Dashboard = () => {
    const { aToken, getDashData, dashData } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getDashData();
        }
    }, [aToken]);

    return (
        dashData && (
            <div className="p-8 space-y-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h2 className="text-xl font-medium text-gray-700">Designers</h2>
                        <p className="text-4xl font-bold text-blue-500">{dashData.designers}</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h2 className="text-xl font-medium text-gray-700">Appointments</h2>
                        <p className="text-4xl font-bold text-green-500">{dashData.appointments}</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h2 className="text-xl font-medium text-gray-700">Users</h2>
                        <p className="text-4xl font-bold text-purple-500">{dashData.Users}</p>
                    </div>
                </div>

                {/* Latest Appointments Table */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-medium text-gray-800 mb-4">Latest Appointments</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3 text-gray-600 font-semibold">Designer</th>
                                <th className="p-3 text-gray-600 font-semibold">Appointment ID</th>
                                <th className="p-3 text-gray-600 font-semibold">Date</th>
                                <th className="p-3 text-gray-600 font-semibold">Time</th>
                                <th className="p-3 text-gray-600 font-semibold">User</th>
                                <th className="p-3 text-gray-600 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashData.latestAppointment.map((appointment, index) => (
                                <tr key={index} className="border-b hover:bg-gray-100">
                                    <td className="p-3 flex items-center">
                                        <img
                                            src={appointment.desData?.image}
                                            alt={appointment.desData?.name}
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <span>{appointment.desData?.name}</span>
                                    </td>
                                    <td className="p-3">{appointment._id}</td>
                                    <td className="p-3">{appointment.slotDate}</td>
                                    <td className="p-3">{appointment.slotTime}</td>
                                    <td className="p-3">{appointment.userData?.name}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-white ${
                                                appointment.cancelled ? 'bg-red-500' : 'bg-green-500'
                                            }`}
                                        >
                                            {appointment.cancelled ? 'Cancelled' : 'Confirmed'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    );
};

export default Dashboard;
