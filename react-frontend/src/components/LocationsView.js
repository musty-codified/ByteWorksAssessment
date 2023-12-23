import React, { useContext, useEffect } from 'react'
import { dataContext } from '../context/AuthContext';
// import ReactPaginate from 'react-paginate';

import './LocationsView.css'

const LocationView = () => {

  const {viewLocations, getLocations, pageElementSize, 
    pageNumber, totalElements, numOfElements, setLocationsUrl} = useContext(dataContext)

  // console.log(locations)

  useEffect(()=>{
    getLocations()

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

  return (  
      <div>
        
      <div>
          <h3 className='table--h3'> View Location Details: </h3>

          <div className='locations-info'>
                 <table className='table'>
                 <thead>

                   <tr>
                  <th>Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Clearing cost</th>
                  </tr>

                </thead>
                <tbody>

            {viewLocations.map((elem)=>(
                 
                  <tr key={elem.id}>
                    
                    <td className='table-data'> {elem.name}</td>
                    <td className='table-data'> {elem.latitude}</td>
                    <td className='table-data'> {elem.longitude}</td>
                    <td className='table-data'> ${elem.clearingCost}</td>
                  </tr>

                ))}

                </tbody>
              </table>
    
              </div>
              
                  </div>
            
          </div>
        
    )
  }
  
export default LocationView


