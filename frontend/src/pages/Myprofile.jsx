import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  // State for managing edit mode and image
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(null);

  // Function to update user profile data in the backend
  const saveProfileUpdates = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phoneNumber', userData.phoneNumber);
      formData.append('address', userData.address);
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success('Profile updated successfully!');
        setEditMode(false); // Exit edit mode
        loadUserProfileData(); // Reload profile data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  // Function to handle profile changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return userData && (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-start items-start">
      <div className="bg-white shadow-lg rounded-lg p-8 w-80">
        {/* Profile Image */}
        <div className="text-center mb-6">
          <img
            src={userData.image}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto object-cover mb-4 shadow-lg"
          />
          {editMode && (
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-2"
            />
          )}
        </div>

        {/* Profile Details */}
        <div className="text-center">
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
            onClick={editMode ? saveProfileUpdates : toggleEditMode}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200 shadow-md"
          >
            {editMode ? 'Save' : 'Edit Profile'}
          </button>
          {editMode && (
            <button
              onClick={toggleEditMode}
              className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400 transition duration-200 shadow-md"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
