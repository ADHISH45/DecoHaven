import React from 'react';
import { SpecialityData } from '../assets/assets';

const Specification = () => {
  return (
    <div id='category' className="py-8 px-4">
      {/* Header Section */}
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">
        Find Your Perfect Design & Designers
      </h2>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-10">
        Explore various interior design specialties. From modern designs to specific tasks like ceiling installations or curtain fittings, choose what suits your style and requirements best.
      </p>

      {/* Speciality Cards Section */}
      <div className="flex flex-wrap justify-around">
        {SpecialityData.map((item, index) => (
          <div 
            key={index} 
            className="speciality-card w-44 mb-6 p-4 text-center bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <img 
              src={item.image} 
              alt={item.speciality} 
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" 
            />
            <h3 className="text-lg font-medium text-gray-700 mb-2">{item.speciality}</h3>
            <p className="text-sm text-gray-500">
              Explore the best {item.speciality.toLowerCase()} for your home, designed by experienced professionals.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Specification;
