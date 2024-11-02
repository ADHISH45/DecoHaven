import React, { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

// Create the AdminContext
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [designers,setDesigners] = useState([])

    // Access backend URL from environment variables
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDesigners = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-designers',{}, {headers:{aToken}})
            if (data.success)
            {
                setDesigners(data.designers)
                console.log(data.designers)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Context value to be shared
    const value = {
        aToken,
        setAToken,
        backendUrl,designers,
        getAllDesigners
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider; 