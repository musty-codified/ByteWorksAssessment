import React, {useState, useEffect} from 'react'
import axios from 'axios';


const Location = () => {

    const [locations, setLocations] = useState([]);
  

      const getLocations = async() =>{
        try{
          const response = await axios.get("http://localhost:8888/api/v1/locations/view-list")
          console.log(response.data.data); // Log the response
          setLocations(response.data.data)
        } catch (error){
         console.log("Error fetchin data...")

        }
      

      }
      
      console.log(locations)

      useEffect(()=>{

        getLocations()


      }, [])

  return (
      <div>
        
      <div className ='card col-md-6 offset-md-3'>
          <h3 text-centre = "true" card-header = "true">View Locations </h3>

          <div className='card-body'>
               {
              
              locations.map((location)=>(
                
                 <div key={location.id}>
                 <li>
                  {location.name}
                 </li>

                 </div>
              ))

               }
                   
            
          </div>
  
         </div>
      
      
      </div>
      
    )
  }
  

export default Location


