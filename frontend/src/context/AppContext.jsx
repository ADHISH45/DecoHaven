import { createContext,useState,useEffect } from 'react'
//import { designer } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    // const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [designers, setDesigners] = useState([])

    const value = {
        designers
    }

    const getDesignersData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/designer/list')
            if (data.success) {
                setDesigners(data.designers)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getDesignersData()
    }, [])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
