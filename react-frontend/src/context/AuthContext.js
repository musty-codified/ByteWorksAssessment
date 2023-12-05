
import React, { useState, useEffect, createContext} from 'react'
import {
  apiPost,
  apiGet, 
  apiPut,} from '../utils/api/Axios.js'
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { decodeJwt, redirectToUserPage } from '../utils/RoleUrlRouter.js';


export const dataContext = createContext();


  const DataProvider=({children})=>{

    const [viewLocations, setViewLocations] = useState([]);
    const[locationsUrl, setLocationsUrl] = useState("locations/view-list")
    const[pageNumber, setPageNumber] = useState(0)
    const[pageElementSize, setPageElementSize] = useState(0)
    const[totalPages, setTotalPages] = useState(0)
    const[totalElements, setTotalElements] = useState(0)
    const[numOfElements, setNumOfElements] = useState(0)
    const[localStorageValue, setLocalStorageValue] = useState(false);
    const[headerTitle, setHeaderTitle] = useState("Add New Location")

    /**==========================================================Registration================================================ **/
      const registerConfig = async (formData) => {
    try {
      const registerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      await apiPost("users/register", registerData).then((res) => {
        console.log(res);
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

    /**==============================================================OTP Verification============================================= **/
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


        /**================================================================Resend Token=========================================== **/
        const resendToken= async(queryParams)=>{

          try{
          //   const resendTokenData = {
          //     subject: subject,
          //  };

          await apiPost(`users/resend-token${queryParams}`).then((res)=>{

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

    /**================================================================Login======================================================= **/
//     const loginConfig= async(loginFormData, location, navigate)=>{
//       try{
//       const loginData = {
//         email:loginFormData.email,
//         password:loginFormData.password
//       };

//       apiPost("auth/login", loginData)
//       .then((res)=> {
//         if(res.data.message === "login successful" ) {
//         toast.success(res.data.message)
//         console.log(res.data.data)
//         const jwtInfo = decodeJwt(res.data.data.token)
//         localStorage.setItem("signature", res.data.data.token);
//         localStorage.setItem("roles", jwtInfo.roles)
//         console.log(jwtInfo.roles)

//         setLocalStorageValue(localStorage.getItem("signature"))
//         redirectToUserPage(location, navigate, jwtInfo.roles)
//         } 
//         else{
//         toast.success(res.data.message)
//          setTimeout(()=>{
//         window.location.href="/login"
//     }, 1500);
//       }
//     })
//     .catch((err)=>{
//       console.log(err.response.data);

//     });

//     } catch(err){ 
//       console.log(err.response.data)
//     }
// }

const loginConfig = async (loginFormData, location, navigate) => {
  try {
    const loginData = {
      email: loginFormData.email,
      password: loginFormData.password,
    };

    const res = await apiPost("auth/login", loginData);

    if (res.data.message === "login successful") {
      toast.success(res.data.message);
      console.log(res.data.data);

      const jwtInfo = decodeJwt(res.data.data.token);
      localStorage.setItem("signature", res.data.data.token);
      localStorage.setItem("roles", jwtInfo.roles);
      console.log(jwtInfo.roles);

      setLocalStorageValue(localStorage.getItem("signature"));
      
      redirectToUserPage(location, navigate, jwtInfo.roles)


      // redirectToUserPage(jwtInfo.roles);
    } else {
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  } catch (err) {
    // Handle errors during the API call or promise rejection
    console.error('Error during login:', err);

    // Log the specific response data if available
    if (err.response && err.response.data) {
      console.log(err.response.data);
    }
  }
};

    /**================================================================Logout======================================================= **/
     const logout=()=>{
      localStorage.clear()
      window.location.href = "/login"
     }
    /**=====================================================View all Locations=================================================== **/
  const getLocations = async() =>{
    const allLocationsUrl = `${locationsUrl}?pageNo=${pageNumber}`

        apiGet(allLocationsUrl).then((res)=>{
        const data = res.data.data
        setViewLocations(data.content)
        setPageNumber(data.number)
        setPageElementSize(data.size)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
        setNumOfElements(data.numberOfElements)
       })
       .catch((err) => {
        console.log(err)
    })

  };

  useEffect(()=>{
    getLocations()

  }, [])

      /**===================================================Add new Location====================================================== **/
      const addLocationConfig = async (formData) => {
        try {
          const addData = {
            name: formData.name,
            latitude: formData.latitude,
            longitude: formData.longitude,
          
          };
          await apiPost("locations/add", addData).then((res) => {
            console.log(res.data);
          });
        } catch (err) {
          console.log(err.response.data.message);
        }
      };

      /**===============================================Update Location========================================================== **/
      const updateLocationConfig = async (formData, locationId) => {
        try {
          const addData = {
            name: formData.name,
            latitude: formData.latitude,
            longitude: formData.longitude,
          
          };
          await apiPut(`locations/update/${locationId}`, addData).then((res) => {
            console.log(res.data);
          });
        } catch (err) {
          console.log(err.response.data.message);
        }
      };

      
     
      /**==================================================Remove Location======================================================== **/
      // const deleteLocationConfig = async (locationId) => {
      //   try {
      //     await apiDelete(`locations/delete/${locationId}`).then((res) => {
      //       console.log(res.data);
      //     });
      
          
      //   } catch (err) {
      //     console.log(err.response.data.message);
      //   }
      // };

     /**==============Calculate optimal route api call======= **/

 return(

    <dataContext.Provider 
    value={{
    registerConfig,
    viewLocations,
    getLocations,
    activateUserConfig,
    loginConfig,
    resendToken,
    localStorageValue,
    logout,
    setLocationsUrl,
    pageElementSize,
    totalPages,
    totalElements,
    numOfElements,
    addLocationConfig,
    updateLocationConfig
    }}>

    {children}
    </dataContext.Provider>
 )  
}

  export default DataProvider