import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import Hero from '../hero/Hero'
import Features from '../../components/Features'
import GeoLocations from '../../components/geoLocations/GeoLocations'
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='bg-white'>
      
    {/* <Navbar/> */}
    <Hero/>
    <Outlet/>
    {/* <GeoLocations/> */}
    <Features/>

    </div>
  )
}

export default HomePage