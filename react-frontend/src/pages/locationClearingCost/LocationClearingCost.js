import React from 'react'
import { useOutletContext } from 'react-router-dom'
import './LocationClearingCost.css'

const LocationClearingCost = () => {

    const {locationDetail} = useOutletContext()
  return (
    <>

    <section className="location-clearingCost">
    <h4>Clearing Cost: ${locationDetail.clearingCost} <span>/ delivery</span></h4>

   </section>
    </>
 
  )
}

export default LocationClearingCost