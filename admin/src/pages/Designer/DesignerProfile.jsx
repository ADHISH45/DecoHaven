import React, { useContext, useEffect, useState } from 'react';
import { DesignerContext } from '../../context/DesignerContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DesignerProfile = () => {
  const { backendUrl, dToken, profileData, setProfileData, getProfileData } = useContext(DesignerContext);
  const [isEditing, setIsEditing] = useState(false);

  // State for holding editable profile data
  const [updatedName, setUpdatedName] = useState('');
  const [updatedSpeciality, setUpdatedSpeciality] = useState('');
  const [updatedAbout, setUpdatedAbout] = useState('');
  const [updatedExperience, setUpdatedExperience] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);

  useEffect(() => {
    if (dToken) {
      getProfileData(); // Fetch profile data if token exists
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setUpdatedName(profileData.name);
      setUpdatedSpeciality(profileData.speciality);
      setUpdatedAbout(profileData.about);
      setUpdatedExperience(profileData.experience);
      setUpdatedImage(profileData.image);
    }
  }, [profileData]);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
  
    // Prepare FormData with updated fields
    const formData = new FormData();
    formData.append('name', updatedName);
    formData.append('speciality', updatedSpeciality);
    formData.append('about', updatedAbout);
    formData.append('experience', updatedExperience);
    if (updatedImage) formData.append('image', updatedImage);
  
    try {
      const response = await axios.put(`${backendUrl}/api/designer/update-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          dToken, // authentication token
        },
      });
  
      console.log(response.data);  // Log the response to verify it contains updated profile data
  
      if (response.data.success) {
        setProfileData(response.data.profileData);  // Update frontend state with the new data
        setIsEditing(false);  // Disable editing mode
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  

  return (
    profileData && (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex items-center space-x-6">
          <img
            src={profileData.image}
            alt={profileData.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{profileData.name}</h2>
            <p className="text-gray-600">{profileData.speciality}</p>
            <p className="text-gray-600">{profileData.email}</p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleProfileUpdate} className="mt-8 space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Speciality */}
            <div>
              <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">Speciality</label>
              <input
                type="text"
                id="speciality"
                value={updatedSpeciality}
                onChange={(e) => setUpdatedSpeciality(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Non-editable Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <p className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600">
                {profileData.email}
              </p>
            </div>

            {/* About */}
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">About</label>
              <textarea
                id="about"
                value={updatedAbout}
                onChange={(e) => setUpdatedAbout(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                rows="4"
              />
            </div>

            {/* Experience */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience (Years)</label>
              <input
                type="number"
                id="experience"
                value={updatedExperience}
                onChange={(e) => setUpdatedExperience(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image (Optional)</label>
              <input
                type="file"
                id="image"
                onChange={(e) => setUpdatedImage(e.target.files[0])}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex space-x-4">
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8">
            <h3 className="text-xl font-medium text-gray-800">Name</h3>
            <p className="text-gray-600 mt-2">{profileData.name}</p>

            <h3 className="text-xl font-medium text-gray-800 mt-6">Speciality</h3>
            <p className="text-gray-600 mt-2">{profileData.speciality}</p>

            <h3 className="text-xl font-medium text-gray-800 mt-6">Email</h3>
            <p className="text-gray-600 mt-2">{profileData.email}</p>

            <h3 className="text-xl font-medium text-gray-800 mt-6">About</h3>
            <p className="text-gray-600 mt-2">{profileData.about}</p>

            <h3 className="text-xl font-medium text-gray-800 mt-6">Experience</h3>
            <p className="text-gray-600 mt-2">{profileData.experience} years</p>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default DesignerProfile;
