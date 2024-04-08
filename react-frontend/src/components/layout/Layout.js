import React from 'react'
import {Outlet} from 'react-router-dom'
import './Layout.css'

import Navbar from '../navbar/Navbar'
const Layout = () => {
  return (
    // <div className='admin-dashboard-layout'>

   <div className='ctn'>
        <Navbar/>
        <div className='children'>
        <Outlet/>

        </div>

    </div>
    // </div>
   
  )
}

export default Layout