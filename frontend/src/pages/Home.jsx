import React from 'react'
import Header from '../components/header'
import Banner from '../components/Banner'
import About from './about'
import Specification from '../components/Specification'
import TopDesigners from '../components/TopDesigners'

const home = () => {
  return (
    <div>
        <Header/>
        <Specification/>
        {/* <TopDesigners /> */}
        <About/>
        <Banner/>
    </div>
  )
}

export default home
