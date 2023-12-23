import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'


import './AdminLayout.css'

const AdminLayout = () => {

  const activeStyles ={
    fontWeight: "bold",
    textDecoration: "underline",
    color: "springgreen"
  }

  return (
    <>
     <div>
        <nav className="admin-nav">
            <NavLink 
             to="." 
             end 
             style={({isActive})=> isActive ? activeStyles : null}
            >Dashboard
            </NavLink>

            <NavLink 
             to="locations"
             style={({isActive})=> isActive ? activeStyles : null}
            >Locations
            </NavLink>

            <NavLink 
             to="stats"
             style={({isActive})=> isActive ? activeStyles : null}
            >Statistics
            </NavLink>
         </nav>
        <Outlet/>
       </div>
    </>
 
  )
}

export default AdminLayout