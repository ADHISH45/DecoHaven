import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';

const AddDesigner = () => {
  const [desImg, setDesImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const validateForm = () => {
    if (!name || !email || !password || !about || !speciality || !experience || !desImg) {
      toast.error('Please fill all fields and select an image');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email');
      return false;
    }
    return true;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append('image', desImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('experience', experience);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-designer`,
        formData,
        { headers: { aToken, 'Content-Type': 'multipart/form-data' } }
      );

      if (data.success) {
        toast.success(data.message);
        setDesImg(false);
        setName('');
        setPassword('');
        setEmail('');
        setAbout('');
        setSpeciality('');
        setExperience('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      if (error.response) {
        console.error('Response Error Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No Response Received:', error.request);
      } else {
        console.error('Error Setting Up Request:', error.message);
      }
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium text-gray-800'>Add Designer</p>

      <div className='bg-white px-8 py-8 border rounded shadow-md w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="des-img">
            <img
              className='w-16 h-16 bg-gray-100 rounded-full cursor-pointer hover:opacity-80 transition-opacity'
              src={desImg ? URL.createObjectURL(desImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDesImg(e.target.files[0])}
            type="file"
            id="des-img"
            hidden
          />
          <p>Upload worker <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Your name</p>
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                className='border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow'
                type="text"
                placeholder='Name'
                required
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Designer Email</p>
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                className='border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow'
                type="email"
                placeholder='Email'
                required
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Set Password</p>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                className='border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow'
                type="password"
                placeholder='Password'
                required
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>About</p>
              <input
                onChange={e => setAbout(e.target.value)}
                value={about}
                className='border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow'
                type="text"
                placeholder='Designer About'
                required
              />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Speciality</p>
              <select
                onChange={e => setSpeciality(e.target.value)}
                value={speciality}
                className='border rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow'
              >
                <option value="">Select a specialty</option>
                <option value="Ceiling Designs">Ceiling Designs</option>
                <option value="Curtain & Blinds Installation">Curtain & Blinds Installation</option>
                <option value="Interior Designing of Living Rooms">Interior Designing of Living Rooms</option>
                <option value="Bedroom Interior Designing">Bedroom Interior Designing</option>
                <option value="Kitchen Design & Renovation">Kitchen Design & Renovation</option>
                <option value="Furniture Customization">Furniture Customization</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Experience</p>
              <input
                onChange={e => setExperience(e.target.value)}
                value={experience}
                className='border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow'
                type="text"
                placeholder='Experience'
                required
              />
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-3 mt-4 rounded-full font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300'
        >
          Add Designer
        </button>

      </div>
    </form>
  );
};

export default AddDesigner;
