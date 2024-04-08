import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { dataContext } from '../../context/AuthContext';
import {Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import './LocationDetail.css'
import jumbotron from '../../assets/images/jumbotronbg.jpg'


const LocationDetails = () => {
    const params = useParams();
    console.log(params)
    const location = useLocation()
    console.log(location)

    const { getSingleLocation, locationDetail} = useContext(dataContext)

    useEffect(()=>{
        getSingleLocation(params.id)
    }, [params.id])

    const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "springgreen"
    }

    const search = location.state?.search || ""
    const name = location.state?.name || "all"
    return (
         <div className=''>
             
             <Link
                to={`..${search}`}
                relative='path'
                className="back-button"
                >&larr; <span>Back to {name} Locations</span></Link>

              <div className="location-detail-container">
           
               {
               
               locationDetail ? (

                <div className="location-detail">
                <img src={jumbotron} alt="Single location" />
                   {/* <div className="location-detail-info-text"> */}

                  {/* <i className={`location--name location--name-${locationDetail.name}`}>  */}
                  <i className={`location-name ${locationDetail.name} Selected`}> 

                  <h2 >{locationDetail.name}</h2> 
                  </i>

                 {/* <p className="location-xy"> ({locationDetail.latitude}, {locationDetail.longitude})</p> */}
                 <p className="location-price"><span className="bold"> From ${locationDetail.clearingCost}</span>/delivery</p>
                    {/* </div>    */}
                </div>

               ): <h2>Loading...</h2>
                  
               } 

        </div>
          <nav className='location-detail-nav'>
          <NavLink
               to="/locations/:id"
               style={({isActive})=> isActive ? activeStyles : null}
               end
         >Details</NavLink>

        <NavLink
               to="/locations/:id/clearingCost"
               style={({isActive})=> isActive ? activeStyles : null}
         >Clearing Cost</NavLink>

          </nav>
        
        <Outlet context={{locationDetail}}/>


    </div>
  )
}

export default LocationDetails