import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()

  const logout = () => {
     navigate('/')
      aToken && setAToken('');
      aToken && localStorage.removeItem('aToken')
  };

  return (
    <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <img src={assets.admin_logo} alt="Admin Logo" className="h-12 w-12 mr-3 rounded-full" />
        <p className="text-xl font-semibold">{aToken ? 'Admin' : 'Designer'}</p>
      </div>
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
