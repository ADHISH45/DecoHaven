import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Toggle dropdown visibility on profile image click
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="bg-indigo-600 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <img
          className="w-32 cursor-pointer"
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate('/')}
        />

        {/* Hamburger for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setShowMenu(!showMenu)} className="focus:outline-none">
            <img src={assets.hamburger_icon} alt="Menu" className="w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`md:flex md:items-center md:gap-8 ${showMenu ? 'block' : 'hidden'} w-full md:w-auto`}>
          <ul className="flex flex-col md:flex-row gap-5 font-semibold text-center">
            <NavLink to="/" className="hover:text-yellow-400">
              <li>HOME</li>
              <hr className="border-yellow-400 w-8 mx-auto mt-1" />
            </NavLink>
            <NavLink to="/designers" className="hover:text-yellow-400">
              <li>DESIGNERS</li>
              <hr className="border-yellow-400 w-8 mx-auto mt-1" />
            </NavLink>
            <NavLink to="/designs" className="hover:text-yellow-400">
              <li>DESIGNS</li>
              <hr className="border-yellow-400 w-8 mx-auto mt-1" />
            </NavLink>
            <NavLink to="/about" className="hover:text-yellow-400">
              <li>ABOUT</li>
              <hr className="border-yellow-400 w-8 mx-auto mt-1" />
            </NavLink>
            <NavLink to="/contact" className="hover:text-yellow-400">
              <li>CONTACTS</li>
              <hr className="border-yellow-400 w-8 mx-auto mt-1" />
            </NavLink>
          </ul>
        </nav>

        {/* Profile and Buttons */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="relative cursor-pointer" onClick={toggleDropdown}>
              <div className="flex items-center gap-2">
                <img className="w-10 h-10 rounded-full" src={userData.image} alt="Profile" />
                <img className="w-3" src={assets.dropdown_icon} alt="Dropdown" />
              </div>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg text-sm font-medium text-gray-700 z-20">
                  <div className="flex flex-col">
                    <p
                      onClick={() => navigate('/myprofile')}
                      className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => navigate('/myappointments')}
                      className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    >
                      Bookings
                    </p>
                    <p onClick={logout} className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-yellow-400 text-indigo-900 px-6 py-2 rounded-full font-light hidden md:block hover:bg-yellow-500 transition duration-300"
            >
              Create Account
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {showMenu && (
        <div className="bg-indigo-700 shadow-lg md:hidden">
          <ul className="flex flex-col items-center gap-5 py-4 font-semibold text-white">
            <NavLink to="/" className="hover:text-yellow-400">
              <li>HOME</li>
              <hr className="border-yellow-400 w-8 mx-auto mt-1" />
            </NavLink>
            <NavLink to="/designers" className="hover:text-yellow-400">
              <li>DESIGNERS</li>
              <hr className="border-yellow-400 w-8 mx-auto mt-1" />
            </NavLink>
            <NavLink to="/designs" className="hover:text-yellow-400">
              <li>DESIGNS</li>
              <hr className="border-yellow-400 w-8 mx-auto mt-1" />
            </NavLink>
            <NavLink to="/about" className="hover:text-yellow-400">
              <li>ABOUT</li>
              <hr className="border-yellow-400 w-8 mx-auto mt-1" />
            </NavLink>
            <NavLink to="/contact" className="hover:text-yellow-400">
              <li>CONTACTS</li>
              <hr className="border-yellow-400 w-8 mx-auto mt-1" />
            </NavLink>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
