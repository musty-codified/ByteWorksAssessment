import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { dataContext } from '../../context/AuthContext';
import {Link, NavLink, Outlet } from 'react-router-dom'
import './LocationDetail.css'
import jumbotron from '../../assets/images/jumbotronbg.jpg'


const LocationDetails = () => {
    const params = useParams();
    console.log(params)

    const { getSingleLocation, locationDetail} = useContext(dataContext)

    useEffect(()=>{
        getSingleLocation(params.id)
    }, [params.id])

    console.log(locationDetail)

    const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "springgreen"
    }

    return (
         <div>
             
             <Link
                to=".."
                relative='path'
                className="back-button"
                >&larr; <span>Back to all Locations</span></Link>


            <div className="location-detail-container">
           
               {
               
               locationDetail ? (

                <div className="location-detail">
                <img src={jumbotron} alt="current location" />
                   <div className="location-detail-info-text">
                <i className={`location-name location-name${locationDetail.name}`}
                        > 
                  <h2 >{locationDetail.name}</h2> </i>
                 <i className="gray"> ({locationDetail.latitude}, {locationDetail.longitude})</i>
                 <p className="location-price"><span className="bold"> From ${locationDetail.clearingCost}</span>/delivery</p>
                    </div>   
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