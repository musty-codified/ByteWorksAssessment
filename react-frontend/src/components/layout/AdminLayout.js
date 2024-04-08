import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useRef } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import { GpsFixedSharp} from "@mui/icons-material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";


import './AdminLayout.css'

const AdminLayout = () => {


  const activeStyles ={
    fontWeight: "bold",
    textDecoration: "underline",
    color: "springgreen"
  }

  // const sidebarRef = useRef()

  // const handleNavDisplay = () => {
  //   sidebarRef.current.classList.toggle("sidebar-hidden")
  // }

  // window.onresize = () => {
  //   if(window.outerWidth <= 889) 
  //     sidebarRef.current.classList.add("sidebar-hidden")
  // }


  return (
    <>
     <div>
        <nav className="admin-nav">

            <NavLink 
             to="." 
             end 
             style={({isActive})=> isActive ? activeStyles : null}
            > 
            <li>
            <DashboardIcon className="icon" />
            Dashboard
            </li>

            </NavLink>



            <NavLink 
             to="locations"
             style={({isActive})=> isActive ? activeStyles : null}
            >  
              <li>
              <GpsFixedSharp className="icon" />
               Locations
              </li>
            </NavLink>


            <NavLink 
             to="stats"
             style={({isActive})=> isActive ? activeStyles : null}
            >
              <li>
                <CreditCardIcon className="icon"/>
                  Analytics
              </li>
              
            </NavLink>
         </nav>
        <Outlet/>
       </div>
    </>
 
  )
}

export default AdminLayout