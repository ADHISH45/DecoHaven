import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DesignersList = () => {
  const { designers, aToken, getAllDesigners } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDesigners();
    }
  }, [aToken]);

  return (
    <div className='p-5'>
      <h2 className='text-xl font-bold mb-4'>List of Designers</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          designers.map((item,index) => (
            <div
            key={index}
            className="bg-white rounded shadow p-4 transition duration-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105 cursor-pointer"
            style={{ width: '250px', margin: '10px', textAlign: 'center' }} // Centered and adjusted card size
          >
            <div className="relative w-full h-40 overflow-hidden rounded-md mb-3">
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                style={{ objectPosition: '50% 0%',  borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }} // Subtle shadow and rounded corners
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600 mt-2">{item.speciality}</p>
          </div>
          
          ))}
      </div>
    </div>
  );
};

export default DesignersList;
