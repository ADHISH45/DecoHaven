import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa'; // Importing icons
import bgImage from '../assets/bg_image.png'; // Background image import

const Contact = () => {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat text-white" 
      style={{ backgroundImage: `url(${bgImage})` }} // Background image for contact section
    >
      {/* Semi-transparent overlay for the background */}
      <div className="w-full h-full absolute bg-black opacity-40"></div> {/* Adjusting the opacity for a darker overlay */}

      {/* Main content with transparent background */}
      <div className="relative z-10 w-full lg:w-2/3 bg-white bg-opacity-50 shadow-xl rounded-lg p-8 lg:p-16 backdrop-blur-md">
        <h1 className="text-4xl font-bold text-indigo-600 mb-8 text-center">Contact Deco Haven</h1>

        {/* Email Section */}
        <div className="flex items-center justify-center lg:justify-start mb-8 transition duration-300 ease-in-out hover:bg-indigo-100 p-4 rounded-lg">
          <FaEnvelope className="text-indigo-600 text-3xl mr-4" />
          <div>
            <span className="text-lg text-gray-700 font-semibold">Email: </span>
            <span className="ml-2 text-lg text-gray-800">info@decohaven.com</span>
          </div>
        </div>

        {/* Instagram Section */}
        <div className="flex items-center justify-center lg:justify-start mb-8 transition duration-300 ease-in-out hover:bg-pink-100 p-4 rounded-lg">
          <FaInstagram className="text-pink-600 text-3xl mr-4" />
          <div>
            <span className="text-lg text-gray-700 font-semibold">Instagram: </span>
            <span className="ml-2 text-lg text-gray-800">@decohaven_interior</span>
          </div>
        </div>

        {/* Facebook Section */}
        <div className="flex items-center justify-center lg:justify-start mb-8 transition duration-300 ease-in-out hover:bg-blue-100 p-4 rounded-lg">
          <FaFacebook className="text-blue-600 text-3xl mr-4" />
          <div>
            <span className="text-lg text-gray-700 font-semibold">Facebook: </span>
            <span className="ml-2 text-lg text-gray-800">facebook.com/decohaven</span>
          </div>
        </div>

        {/* X (Twitter) Section */}
        <div className="flex items-center justify-center lg:justify-start mb-8 transition duration-300 ease-in-out hover:bg-blue-50 p-4 rounded-lg">
          <FaTwitter className="text-blue-500 text-3xl mr-4" />
          <div>
            <span className="text-lg text-gray-700 font-semibold">X (formerly Twitter): </span>
            <span className="ml-2 text-lg text-gray-800">@decohaven_x</span>
          </div>
        </div>

        {/* Address and Additional Contact Information */}
        <div className="mt-8 text-center lg:text-left">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Address</h2>
          <p className="text-lg text-gray-700">
            Deco Haven Office, 123 Interior Design Lane,<br />
            Kasargod, Kerala, India
          </p>
          <p className="text-lg text-gray-700 mt-2">
            Phone: +91 9876543210
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
