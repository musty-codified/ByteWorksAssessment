import React from 'react'
import Hero from '../hero/Hero'
import Features from '../../components/Features'
import { Outlet } from 'react-router-dom';
import ServiceSection from '../../components/serviceSection/ServiceSection';

const HomePage = () => {
  return (
    <div className=''>
      
    <Hero/>

    <ServiceSection/>
    
    <Outlet/>
    <Features/>

    </div>
  )
}

export default HomePage