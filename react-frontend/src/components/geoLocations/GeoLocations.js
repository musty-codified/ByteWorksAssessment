import React from 'react'
import './GeoLocations.css'
import LocationCard from '../locationCard/LocationCard'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Empty} from 'antd';

import { Link, useSearchParams } from 'react-router-dom'

const GeoLocations = () => {
     const [searchParams, setSearchParams] = useSearchParams();

    const nameFilter = (searchParams.get("name"))
    console.log(nameFilter)
    console.log(searchParams.toString())

    const {getLocations, viewLocations, error, loading} = useAuth()

   useEffect(()=>{
    console.log("component is mounted");
    getLocations()

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


         if (loading) {
       return <h1 aria-live='polite'>Loading....</h1>
         }

        if (error) {
          return <h1 aria-live="assertive">Error fetching locations</h1>
         }

        // const displayedLocations = nameFilter 
        //   ? viewLocations.filter(char=> char.name === nameFilter) : viewLocations

          const filteredLocations = nameFilter
           ? viewLocations.filter((location) =>
             location.name.toLowerCase().includes(nameFilter.toLowerCase())
             )
             : viewLocations;


      return (

       <div className="location-list-container">

        <h3 className='heading-text'>EXPLORE OUR DELIVERY LOCATION OPTIONS{" "}</h3>

          <div className="location-list-filter-btns">
          <button 
               onClick={()=>setSearchParams({name:"USA"})}
              className="location-name usa">USA
           </button>

          <button 
               onClick={()=>setSearchParams({name:"UK"})}
            className="location-name uk">UNITED KINGDOM
          </button>

          <button 
               onClick={()=>setSearchParams({name:"Latin America"})}
            className="location-name latin">LATIN AMERICA
          </button>

          <button 
               onClick={()=>setSearchParams({name:"Europe"})}
            className="location-name latin">EUROPE
          </button>

          { nameFilter ? (<button 
               onClick={()=>setSearchParams({})}
             className="location-name clear-filters">CLEAR
          </button>): null
          }

          </div>

        <div className='location-tiles container'>

        { viewLocations.length > 0 ? 
           filteredLocations.map((location)=> (
            <div key={location.id}>

            <Link 
                to={`/locations/${location.id}`} 
                state={{search:`?${searchParams.toString()}`,
                name:nameFilter
                }}
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