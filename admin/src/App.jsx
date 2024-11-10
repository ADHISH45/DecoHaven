import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext  } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDesigner from './pages/Admin/AddDesigner';
import DesignersList from './pages/Admin/DesignersList';
import { DesignerContext } from './context/DesignerContext';
import DesignerDashboard from './pages/Designer/DesignerDashboard';
import DesignerAppointments from './pages/Designer/DesignerAppointments';
import DesignerProfile from './pages/Designer/DesignerProfile';

const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DesignerContext)
  return aToken|| dToken ?  (
    <div>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-designer' element={<AddDesigner/>} />
          <Route path='/designer-list' element={<DesignersList/>} />

           {/* Designer Routes */}

          <Route path='/designer-dashboard' element={<DesignerDashboard/>} />
          <Route path='/designer-appointments' element={<DesignerAppointments/>} />
          <Route path='/designer-profile' element={<DesignerProfile/>} />
          
          
        </Routes>
      </div>
    </div>
  ):(
    <>
      <Login />
      <ToastContainer/>
    </>
  )
}

export default App
