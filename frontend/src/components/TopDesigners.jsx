import React, { useContext } from 'react'
// import { designer } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDesigners = () => {

  const navigate = useNavigate()
  const {designers} = useContext(AppContext)
  return (
    <div className="py-10 px-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Top Designers</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {designers.map((item, index) => (
          <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
            key={index} 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-800">{item.name}</p>
              <p className="text-gray-600 text-sm mb-4">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopDesigners
