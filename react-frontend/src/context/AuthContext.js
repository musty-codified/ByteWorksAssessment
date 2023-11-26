
import React, { useState, useEffect, createContext} from 'react'
import {apiPost, apiGetAuthorization} from '../utils/api/axios.js'
import axios from 'axios';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        console.log(res.data.message);
        localStorage.setItem("signature", res.data.data.email)
        toast.success(res.data.message)
        setTimeout(() => {
          window.location.href = "/check-mail";
        }, 1500); 
      });
    } catch (err) {
      toast.error(err.response.data.error)
      console.log(err.response.data.message);
    }
  };

    /**==============OTP Verification ======= **/
    const activateUserConfig= async(tokenData)=>{
  
      try{
      const activateUserData = {
         email : tokenData.email,
          otp: tokenData.token,
      };

      await apiPost("users/activate-user", activateUserData).then((res)=>{
        if (localStorage.getItem("signature") === activateUserData.email){
          toast.success(res.data.message)
          console.log(res.data);
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000)

        }
       ; 

      });
    } catch(err){
      console.log(err) 
    }
    
    }


        /**==============Resend Token======= **/
        const resendToken= async(email, subject)=>{

          try{
            const resendTokenData = {
              subject: subject,
           };
     

          await apiPost(`users/resend-token?email=${email}&reason=${subject}`, resendTokenData).then((res)=>{

            toast.success(res.data.message)
            console.log(res);
            setTimeout(() => {
              window.location.href = "/check-mail";
            }, 2000); 
    
          });
        }catch(err){
        console.log(err)
  }
}



    /**==============Login======= **/
    const loginConfig= async(loginFormData)=>{
      try{
      const loginData = {
        email:loginFormData.email,
        password:loginFormData.password
      };

      await apiPost("/auth/login", loginData).then((res)=>{
        if(res.data.message === "login successful" )
        toast.success(res.data.message)
      setTimeout(()=>{
        window.location.href="/"
    }, 200);
      })

    } catch(err)
    { 
      console.log(err)
    }

    }




    /**==============View Locations======= **/
  const getLocations = async() =>{

    const response = await axios.get(
      "http://localhost:8888/api/v1/locations/view-list")
      setLocations(response.data.data.content)

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
    activateUserConfig,
    loginConfig,
    resendToken
    }}>

    {children}
    </dataContext.Provider>
 )  
}

  export default DataProvider