import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Designers from './pages/Designers'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import MyAppointments from './pages/Myappointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Designs from './pages/Designs'
import PaymentPage from './pages/Paymentpage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/designers' element={<Designers />} />
        <Route path='/designers/:speciality' element={<Designers />} />
        <Route path='/login' element={<Login />} />
        <Route path='/designs' element={<Designs />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/myprofile' element={<Myprofile />} />
        <Route path='/Myappointments' element={<MyAppointments />} />
        <Route path='/appointment/:desId' element={<Appointment />} /> {/* Corrected route */}
        <Route path="/payment/:appointmentId" element={<PaymentPage />} />

      </Routes>
    </div>
  );
}

export default App;
