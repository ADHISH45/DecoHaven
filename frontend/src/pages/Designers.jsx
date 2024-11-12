import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Designers = () => {
  const { speciality } = useParams();
  const [filterDes, setFilterDes] = useState([]);
  const navigate = useNavigate();

  const { designers } = useContext(AppContext);

  // Define list of specialties
  const specialties = [
    'Ceiling Designs',
    'Curtain & Blinds Installation',
    'Interior Designing of Living Rooms',
    'Bedroom Interior Designing',
    'Kitchen Design & Renovation',
    'Furniture Customization',
  ];

  // Filter designers based on selected specialty
  const applyFilter = () => {
    if (speciality) {
      setFilterDes(designers.filter(des => des.speciality === speciality));
    } else {
      setFilterDes(designers);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [designers, speciality]);

  return (
    <div className="py-10 px-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Top Designers</h1>
      
      {/* Speciality filter list */}
      <div className="flex flex-wrap justify-center space-x-4 mb-8">
        {specialties.map((spec, index) => (
          <button
            key={index}
            onClick={() => navigate(`/designers/${spec}`)}
            className={`text-gray-600 py-2 px-4 rounded-lg transition-colors duration-200 ${
              speciality === spec ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filterDes.map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
              style={{ objectPosition: '50% 0%' }} // This ensures the top of the image is prioritized
            />
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-800">{item.name}</p>
              <p className="text-gray-600 text-sm mb-4">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Designers;
