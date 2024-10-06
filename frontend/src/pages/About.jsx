import React from 'react';
import aboutImage from '../assets/about_image.png'; // Import your image here

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center px-6 py-10 lg:px-20 lg:py-20 bg-gray-100">
      
      {/* Image Section */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
        <img 
          src={aboutImage} 
          alt="Deco Haven" 
          className="w-full h-auto rounded-lg shadow-md" 
        />
      </div>
      
      {/* Text Section */}
      <div className="w-full lg:w-1/2 lg:pl-10 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">About Deco Haven</h1>
        <p className="text-gray-700 text-lg mb-6">
          Welcome to <span className="text-indigo-600 font-semibold">Deco Haven</span>, your go-to platform for all your interior design needs. 
          Whether you're looking to transform your living space, design a new office, or simply refresh your home decor, our expert 
          designers are here to help. At Deco Haven, we connect you with top interior design professionals, allowing you to 
          view portfolios, book site visits, and communicate in real time.
        </p>
        <p className="text-gray-700 text-lg mb-6">
          We provide a seamless platform where you can explore various design ideas, customize them according to your preferences, 
          and collaborate with designers to make your dream space a reality. Whether it's modern, minimalist, or rustic styles, Deco Haven 
          ensures that you have access to the best designers in the industry.
        </p>
        <p className="text-gray-700 text-lg font-semibold">
          Join us in turning your vision into a beautiful reality.
        </p>
      </div>
    </div>
  );
};

export default About;
