import React from 'react'
import './GeoLocations.css'
import LocationCard from '../locationCard/LocationCard'
import { useContext, useEffect, useState } from 'react'
import { dataContext } from '../../context/AuthContext'
import { Empty} from 'antd';

import { Link, useSearchParams } from 'react-router-dom'

const GeoLocations = () => {
  // const [searchParams, setSearchParams] = useSearchParams();

  const {getLocations, viewLocations, loading, error} = useContext(dataContext)



  useEffect(()=>{
    console.log("component is mounted");
    getLocations()

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


  //  const nameFilter = searchParams.get("name");
  //  console.log(nameFilter)

      // const displayedLocations = nameFilter
      //   ? viewLocations.filter(location => location.name === nameFilter)
      //   : viewLocations

      //   if (loading) {
      //     return <h1 aria-live="polite">Loading...</h1>
      // }

        if (error) {
          return <h1 aria-live="assertive">Error fetching locations</h1>
      }


      return (

       <div className='yetTobeStyled'>

        <h3 className='yetTobeStyled'>EXPLORE OUR DELIVERY LOCATION OPTIONS{" "}</h3>

        <div className='location-tiles container'>
        { viewLocations.length > 0 ? 
           viewLocations.map((location)=> (
            <div key={location.id}>

            <Link 
                to={`/locations/${location.id}`} 
                aria-label={`View details for ${location.name}, 
                at ${location.latitude} degrees latitude and ${location.longitude} degrees longitude `}
            >
            
         <section className='locations-list'>
          <LocationCard 
            key={location.id}
            lName={location.name} 
            clearingCost={location.clearingCost}/>
         </section>

         </Link>
     </div>

      )) 
      : <Empty/>
      
     }
   </div>
    </div>
  )
}

export default GeoLocations