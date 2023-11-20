
import React, { useState, useEffect, createContext} from 'react'
import {apiPost, apiGet, apiGetAuthorization} from '../utils/api/axios.js'
import axios from 'axios';


export const dataContext = createContext();


const DataProvider=({children})=>{

    const [locations, setLocations] = useState([]);




    /**==============Registration======= **/
const registerConfig = async (formData) => {
    try {
      const registerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      await apiPost("users/register", registerData).then((res) => {
        console.log(res.data.data);
        setTimeout(() => {
          window.location.href = "/check-mail";
        }, 1500);
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };



    /**==============View Locations======= **/
  const getLocations = async() =>{
    try{
      const response = await apiGet(`locations/view-list`).then((res)=>{
        setLocations(response.data.data.content)
        // console.log(locations)


      });


    } catch (error){
     console.log("Error fetchin data...")

    // const response = await axios.get(
    //   "http://localhost:8888/api/v1/locations/view-list")
    //   setLocations(response.data.data.content)


    }
  };


  useEffect(()=>{
    getLocations()


  }, [])

 return(

    <dataContext.Provider 
    value={{
    registerConfig,
    locations,
    getLocations,
    }}>

    {children}
    </dataContext.Provider>
 )  


}

  export default DataProvider