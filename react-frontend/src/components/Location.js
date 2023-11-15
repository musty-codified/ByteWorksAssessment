import React, {useState, useEffect} from 'react'
import axios from 'axios';


const Location = () => {

    const [locations, setLocations] = useState([]);
  
    const GET_LOCATION_BASE_URL=  "http://localhost:8888/api/v1/locations/view-list";

      const getLocations = async()=>{
        const response = await axios.get(GET_LOCATION_BASE_URL)


        setLocations(response.data.locations)
        console.log(response.data.locations)

        


      }
      console.log(locations)

      useEffect(()=>{
        getLocations()

      }, [])

  return (
      <div>
      <div className ='card col-md-6 offset-md-3'>
          <h3 text-centre card-header >View Employee Details</h3>
          <div className='card-body'>
  
          
             
          </div>
  
  
  
         </div>
      
      
      </div>
      
    )
  }
  

export default Location


