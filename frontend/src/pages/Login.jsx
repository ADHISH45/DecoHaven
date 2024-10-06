import React, { useState } from 'react';

const Login = () => {
  const [state, setState] = useState('Sign Up'); // Toggle between Sign Up and Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState(''); // Phone Number state
  const [address, setAddress] = useState(''); // Address state

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (state === 'Sign Up') {
      // Handle Sign Up logic here
      console.log('Signing Up with:', { name, email, password, phoneNo, address });
    } else {
      // Handle Login logic here
      console.log('Logging in with:', { email, password });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={onSubmitHandler} 
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {state === 'Sign Up' ? 'Create an Account' : 'Login to Your Account'}
        </h2>
        
        {state === 'Sign Up' && (
          <>
            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            
            {/* Phone Number Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
              <input 
                type="text" 
                value={phoneNo} 
                onChange={(e) => setPhoneNo(e.target.value)} 
                placeholder="Enter your phone number" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            
            {/* Address Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Enter your address" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
          </>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        
        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          {state}
        </button>

        {/* Toggle between Sign Up and Login */}
        <p 
          onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')} 
          className="text-sm text-center text-indigo-600 mt-4 cursor-pointer hover:underline"
        >
          {state === 'Sign Up' ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
        </p>
      </form>
    </div>
  );
};

export default Login;
