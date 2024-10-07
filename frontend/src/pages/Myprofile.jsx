import React, { useState } from 'react';
import { assets } from '../assets/assets'; // Ensure assets.profile_pic is available

const MyProfile = () => {
  // Defining state for profile details
  const [userData, setUserData] = useState({
    name: 'John Doe',
    image: assets.profile_pic, // This should point to the correct image in your assets folder
    phoneNumber: '+1 234 567 890',
    address: '1234 Elm Street, Springfield, IL'
  });

  // State for managing edit mode
  const [editMode, setEditMode] = useState(false);

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(prevEditMode => !prevEditMode);
  };

  // Function to handle profile changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-start items-start">
      <div className="bg-white shadow-lg rounded-lg p-8 w-80">
        {/* Profile Image */}
        <div className="text-center mb-6">
          <img 
            src={userData.image} // Using userData.image
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto object-cover mb-4 shadow-lg" 
          />
        </div>

        {/* Profile Details */}
        <div className="text-center">
          {/* Conditionally rendering profile fields based on editMode */}
          {editMode ? (
            <div className="space-y-4">
              <input 
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{userData.name}</h2>
              <p className="text-gray-600 mb-2">Phone: {userData.phoneNumber}</p>
              <p className="text-gray-600">Address: {userData.address}</p>
            </>
          )}
        </div>

        {/* Edit Mode Toggle Button */}
        <div className="text-center mt-6">
          <button 
            onClick={toggleEditMode}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200 shadow-md"
          >
            {editMode ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
