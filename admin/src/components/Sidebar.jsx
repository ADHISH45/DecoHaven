import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DesignerContext } from '../context/DesignerContext';

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DesignerContext);
    return (
        <div className="w-64 h-full bg-gray-800 text-white">
            {aToken && (
                <ul className="flex flex-col p-4">
                    <li className="mb-2">
                        <NavLink 
                            to="/admin-dashboard" 
                            className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                                    isActive ? 'bg-gray-700' : ''
                                }`
                            }
                        >
                            <img src={assets.home_icon} alt="" className="w-6 h-6 mr-3" />
                            <p>Dashboard</p>
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink 
                            to="/all-appointments" 
                            className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                                    isActive ? 'bg-gray-700' : ''
                                }`
                            }
                        >
                            <img src={assets.appointment_icon} alt="" className="w-6 h-6 mr-3" />
                            <p>Appointments</p>
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink 
                            to="/add-designer" 
                            className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                                    isActive ? 'bg-gray-700' : ''
                                }`
                            }
                        >
                            <img src={assets.add_icon} alt="" className="w-6 h-6 mr-3" />
                            <p>Add Designers</p>
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink 
                            to="/designer-list" 
                            className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                                    isActive ? 'bg-gray-700' : ''
                                }`
                            }
                        >
                            <img src={assets.people_icon} alt="" className="w-6 h-6 mr-3" />
                            <p>Designers List</p>
                        </NavLink>
                    </li>
                </ul>
            )}

    {
    dToken && (
        <ul className="flex flex-col p-4">
            <li className="mb-2">
                <NavLink 
                    to="/designer-dashboard" 
                    className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                            isActive ? 'bg-gray-700' : ''
                        }`
                    }
                >
                    <img src={assets.home_icon} alt="" className="w-6 h-6 mr-3" />
                    <p>Dashboard</p>
                </NavLink>
            </li>
            <li className="mb-2">
                <NavLink 
                    to="/designer-appointments" 
                    className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                            isActive ? 'bg-gray-700' : ''
                        }`
                    }
                >
                    <img src={assets.appointment_icon} alt="" className="w-6 h-6 mr-3" />
                    <p>Appointments</p>
                </NavLink>
            </li>
           
            <li className="mb-2">
                <NavLink 
                    to="/designer-profile" 
                    className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                            isActive ? 'bg-gray-700' : ''
                        }`
                    }
                >
                    <img src={assets.people_icon} alt="" className="w-6 h-6 mr-3" />
                    <p>Profile</p>
                </NavLink>
            </li>
        </ul>
    )}
</div>
)
};

export default Sidebar;
