import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {

  // Function to scroll smoothly to the category section
  const scrollToCategory = () => {
    const categorySection = document.getElementById('speciality');
    if (categorySection) {
      categorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='flex flex-col md:flex-row bg-gradient-to-r from-pink-300 to-pink-100 rounded-lg px-5 md:px-10 lg:px-20'>
      {/* -------Left Section--- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 md:gap-6 text-center md:text-left'>
        <p className='text-3xl font-extrabold text-blue-600 md:text-4xl lg:text-5xl leading-tight'>
          Home to Beautiful <br /> Interiors
        </p>
        <p className='text-gray-700 text-lg md:text-xl lg:text-2xl'>
          Discover the most elegant interior designs crafted to perfection.
        </p>
        <a
          onClick={scrollToCategory}
          className='flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-full text-sm md:text-base font-medium m-auto md:m-0 hover:bg-blue-600 hover:scale-105 transition-transform duration-300 cursor-pointer'
        >
          Book Site Visit <img className='w-4' src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* -------Right Section--- */}
      <div className='md:w-1/2 relative'>
        <img
          className='w-full h-64 md:h-[18vw] lg:h-[20vw] md:absolute bottom-0 rounded-lg'
          src={assets.header_img}
          alt="Interior Design"
        />
      </div>
    </div>
  );
};

export default Header;
