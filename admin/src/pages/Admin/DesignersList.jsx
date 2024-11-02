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
              className='bg-white rounded shadow p-4 transition duration-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105 cursor-pointer'
            >
              <img
                src={item.image}
                alt=""
                className='w-full h-40 object-cover rounded mb-3'
              />
              <h3 className='text-lg font-semibold'>{item.name}</h3>
              <p className='text-gray-600'>{item.speciality}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DesignersList;
