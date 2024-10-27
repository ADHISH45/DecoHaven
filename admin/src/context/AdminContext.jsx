import React, { createContext, useState } from "react";

// Create the AdminContext
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')

    // Access backend URL from environment variables
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    

    // Context value to be shared
    const value = {
        aToken,
        setAToken,
        backendUrl
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
