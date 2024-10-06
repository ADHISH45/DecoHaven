import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Designers from './pages/designers' 
import Login from './pages/login'
import About from './pages/about'
import Contact from './pages/contact'
import Myprofile from './pages/myprofile'
import Myappointments from './pages/myappointments'
import Appointment from './pages/appointment'
import Navbar from './components/navbar'
import Designs from './pages/Designs'
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/designers' element={<Designers />} />
        <Route path='/designers/:Category' element={<Designers />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/designs' element={<Designs/>} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/myprofile' element={<Myprofile />} />
        <Route path='/myappointments' element={<Myappointments />} />
        <Route path='/myappointments/:desId' element={<Appointment />} />
      </Routes>
    </div>
  )
}

export default App
