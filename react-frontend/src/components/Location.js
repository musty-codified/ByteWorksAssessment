import React, {useState, useEffect} from 'react'
import axios from 'axios';


const Location = () => {

    const [locations, setLocations] = useState([]);
  

      const getLocations = async() =>{
        try{
          const response = await axios.get("http://localhost:8888/api/v1/locations/view-list")
          console.log(response.data.data.content); // Log the response
          setLocations(response.data.data.content)
        } catch (error){
         console.log("Error fetchin data...")

        }
      

      }
      
      // console.log(locations)

      useEffect(()=>{

        getLocations()


      }, [])

  return (
      <div>
        
      <div className ='card col-md-6 offset-md-3'>
          <h3 text-centre = "true" card-header = "true">View Locations: </h3>

          <div className='card-body'>

            {
              locations.map((elem, index)=>(
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


