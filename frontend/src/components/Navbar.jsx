import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <header className='bg-white shadow-lg'>
      <div className='container mx-auto flex justify-between items-center py-4 px-6'>
        {/* Logo */}
        <img
          className='w-32 cursor-pointer'
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate('/')}
        />

        {/* Hamburger for Mobile */}
        <div className='md:hidden flex items-center'>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className='focus:outline-none'
          >
            <img src={assets.hamburger_icon} alt="Menu" className='w-6' />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`md:flex md:items-center md:gap-8 ${showMenu ? 'block' : 'hidden'} w-full md:w-auto`}>
          <ul className='flex flex-col md:flex-row gap-5 font-semibold'>
            <NavLink to='/' className='hover:text-indigo-600'>
              <li>HOME</li>
              <hr className='border-indigo-600 w-8 mx-auto mt-1' />
            </NavLink>
            <NavLink to='/designers' className='hover:text-indigo-600'>
              <li>DESIGNERS</li>
              <hr className='border-indigo-600 w-8 mx-auto mt-1' />
            </NavLink>
            <NavLink to='/designs' className='hover:text-indigo-600'>
              <li>DESIGNS</li>
              <hr className='border-indigo-600 w-8 mx-auto mt-1' />
            </NavLink>
            <NavLink to='/about' className='hover:text-indigo-600'>
              <li>ABOUT</li>
              <hr className='border-indigo-600 w-8 mx-auto mt-1' />
            </NavLink>
            <NavLink to='/contact' className='hover:text-indigo-600'>
              <li>CONTACTS</li>
              <hr className='border-indigo-600 w-8 mx-auto mt-1' />
            </NavLink>
          </ul>
        </nav>

        {/* Profile and Buttons */}
        <div className='flex items-center gap-4'>
          {token ? (
            <div className='relative group'>
              <div className='flex items-center gap-2 cursor-pointer'>
                <img className='w-10 h-10 rounded-full' src={assets.profile_pic} alt="Profile" />
                <img className='w-3' src={assets.dropdown_icon} alt="Dropdown" />
              </div>

              {/* Dropdown */}
              <div className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl text-sm font-medium text-gray-700 z-20 hidden group-hover:block'>
                <div className='flex flex-col'>
                  <p
                    onClick={() => navigate('/myprofile')}
                    className='hover:bg-gray-100 px-4 py-2 cursor-pointer'
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate('/myappointment')}
                    className='hover:bg-gray-100 px-4 py-2 cursor-pointer'
                  >
                    Bookings
                  </p>
                  <p
                    onClick={() => setToken(false)}
                    className='hover:bg-gray-100 px-4 py-2 cursor-pointer'
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='bg-indigo-600 text-white px-6 py-2 rounded-full font-light hidden md:block hover:bg-indigo-700 transition duration-300'
            >
              Create Account
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {showMenu && (
        <div className='bg-white shadow-lg md:hidden'>
          <ul className='flex flex-col items-center gap-5 py-4 font-semibold'>
            <NavLink to='/' className='hover:text-indigo-600'>
              <li>HOME</li>
              <hr className='border-indigo-600 w-8 mx-auto mt-1' />
            </NavLink>
            <NavLink to='/designers' className='hover:text-indigo-600'>
              <li>DESIGNERS</li>
              <hr className='border-indigo-600 w-8 mx-auto mt-1' />
            </NavLink>
            <NavLink to='/about' className='hover:text-indigo-600'>
              <li>ABOUT</li>
              <hr className='border-indigo-600 w-8 mx-auto mt-1' />
            </NavLink>
            <NavLink to='/contact' className='hover:text-indigo-600'>
              <li>CONTACTS</li>
              <hr className='border-indigo-600 w-8 mx-auto mt-1' />
            </NavLink>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
