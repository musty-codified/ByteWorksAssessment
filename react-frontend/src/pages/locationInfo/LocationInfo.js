import React from 'react'
import { useOutletContext } from 'react-router-dom'
import './LocationInfo.css'
const LocationInfo = () => {

    const {locationDetail} = useOutletContext()

  return (
    <>

    <section className="location-detail-info">

       <h4>Name: <span>{locationDetail.name}</span></h4>
       <h4>Geo-coordinates:<span>({locationDetail.latitude}, {locationDetail.longitude})</span> </h4>
   </section>
    </>
 
  )
}

export default LocationInfo