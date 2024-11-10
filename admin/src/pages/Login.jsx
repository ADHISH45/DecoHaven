import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DesignerContext } from '../context/DesignerContext';

const backendUrl = 'http://localhost:4000'; // Make sure to replace this with the actual backend URL

const Login = () => {
    const [userType, setUserType] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken } = useContext(AdminContext);
    const {setDToken} = useContext(DesignerContext)


    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (userType === 'Admin') {
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
                if (data.success) {
                    localStorage.setItem('aToken',data.token);
                    setAToken(data.token); // Save the token in the context
                }
                else {
                    toast.error(data.message)
                }
            } else {
                // Handle Designer login similarly
                const { data } = await axios.post(`${backendUrl}/api/designer/login`, { email, password });
                if (data.success) {
                    localStorage.setItem('dToken',data.token);
                    setDToken(data.token); // Save the token in the context
                    console.log(data.token);
                    
                }
                else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Function to toggle between Admin and Designer login
    const toggleUserType = () => {
        setUserType(userType === 'Admin' ? 'Designer' : 'Admin');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {userType} Login
                </h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={toggleUserType}
                        className="text-blue-500 hover:text-blue-700 text-sm font-bold"
                    >
                        Switch to {userType === 'Admin' ? 'Designer' : 'Admin'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
