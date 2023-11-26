import React, { useContext } from 'react'
import { dataContext } from '../context/AuthContext';


const Location = () => {

  const {locations} = useContext(dataContext)

  // console.log(locations)

  return (  
      <div>
        
      <div className ='card col-md-6 offset-md-3'>
          <h3 text-centre = "true" card-header = "true"> View Locations: </h3>

          <div className='card-body'>

            {
              locations.map((elem)=>(
                <div key={elem.id}>
                 
              <div className='row'>
              <p>
                <strong>Name:</strong> {elem.name}
              </p>
              </div>

              <div className='row'>
              <p>
                <strong>Latitude:</strong> {elem.latitude}
              </p>
              </div>

              <div className='row'>
              <p>
                <strong>Longitude:</strong> {elem.longitude}
              </p>
              </div>

              <div className='row'>
              <p>
                <strong>Clearing Cost:</strong> ${elem.clearingCost}
              </p>
                
              </div>
              
              
              <hr />

                  </div>


              ))

            }
            
          </div>
  
         </div>
      
      
      </div>
      
    )
  }
  

export default Location


