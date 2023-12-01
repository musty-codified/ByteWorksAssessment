import React, { useContext } from 'react'
import { dataContext } from '../context/AuthContext';
import './Location.css'


const Location = () => {

  const {locations} = useContext(dataContext)

  // console.log(locations)

  return (  
      <div>
        
      <div >
          <h3 className='table--h3'> View Location Details: </h3>

          <div className='loc'>
                 <table>
                 <thead>

                   <tr>
                  <th>Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Clearing cost</th>
                  </tr>

                </thead>
                <tbody>

            {locations.map((elem)=>(
                 
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
  

export default Location


