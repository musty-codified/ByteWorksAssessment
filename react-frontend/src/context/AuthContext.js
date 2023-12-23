
import React, { useState, createContext} from 'react'
import {
  apiPost,
  apiGet, 
  apiPut,
  apiPostAuthorization,
  apiDeleteAuthorization,
  apiGetAuthorization
} 
from '../utils/api/Axios.js'
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {decodeJwt, redirectToUserPage } from '../utils/RoleUrlRouter.js';


export const dataContext = createContext();

  const DataProvider=({children})=>{

    const [viewLocations, setViewLocations] = useState([]);
    const [locationDetail, setLocationDetail] = useState({});

    const[locationsUrl, setLocationsUrl] = useState("locations/view-list")
    const[pageNumber, setPageNumber] = useState(0)
    const[pageElementSize, setPageElementSize] = useState(0)
    const[totalPages, setTotalPages] = useState(0)
    const[totalElements, setTotalElements] = useState(0)
    const[numOfElements, setNumOfElements] = useState(0)
    const[localStorageValue, setLocalStorageValue] = useState(false);
    const[singleLocation, setSingleLocation] = useState([])

    const[headerTitle, setHeaderTitle] = useState("Add New Location");

    // const [getUser, setGetUser] = useState({});
    const [showNavbar, setShowNavbar] = useState(true)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);




    /** ====================================REGISTER=============================== **/
      const registerConfig = async (formData) => {
       try {
          const registerData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
      };

      await apiPost("users/register", registerData)
      .then((res) => {
        // localStorage.setItem("signature", res.data.data.email)
        
        toast.success(res.data.message)
        setTimeout(() => {
          window.location.href = "/check-mail";
        }, 1500); 
      });

    }catch (err) {
      toast.error(err.response.data.error)
      console.log(err.response.data.message);
    }
  };

    /** ===================================OTP VERIFICATION============================= **/
    const activateUserConfig= async(tokenData)=>{
  
         try{
               const activateUserData = {
               email : tokenData.email,
               activationToken : tokenData.activationToken,
           };

          await apiPost("users/activate-user", activateUserData).then((res)=>{
          toast.success(res.data.message)
          console.log(res.data);
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000)

      });
     } catch(err){
      console.log(err) 
    }
    
  }

        /** =======================================RESEND TOKEN=================================== **/
        const resendToken= async(queryParams)=>{

            try{
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

    /**===============================================LOGIN======================================== **/
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

      const jwtInfo = decodeJwt(res.data.data.token);
      localStorage.setItem("signature", res.data.data.token);
      localStorage.setItem("roles", jwtInfo.roles);

      setLocalStorageValue(localStorage.getItem("signature"));
      redirectToUserPage(location, navigate, jwtInfo.roles)
      console.log(location);

    } else {
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  } catch (err) {
    // Handle errors during the API call or promise rejection
    console.error('Error during login:', err);
    toast.error(err.response.data.error)


    // Log the specific response data if available
    if (err.response && err.response.data) {
      console.log(err.response.data);
    }
  }
};

    /**==========================================LOGOUT======================================= **/
     const logout=()=>{
      localStorage.clear()
      window.location.href = "/login"
     }
    /**======================================VIEW ALL LOCATIONS================================== **/
  const getLocations = async() =>{
    const allLocationsUrl = `${locationsUrl}?pageNo=${pageNumber}`

      await apiGet(allLocationsUrl).then((res)=>{
        const data = res.data.data
        setLoading(true)
        setViewLocations([...data.content])
        setPageNumber(data.number)
        setPageElementSize(data.size)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
        setNumOfElements(data.numberOfElements)
       })
       .catch((err) => {
        setError(err)
    }).finally(
      setLoading(false)
    );

  };


   /**======================================VIEW SINGLE LOCATION================================== **/
   const getSingleLocation = async(id) =>{

       await apiGet(`locations/${id}`).then((res)=>{
        const data = res.data
        console.log(data.data)
        setLocationDetail(data.data)
        
       })
       .catch((err) => {
        console.log(err)
    })

  };

      /**======================================ADD NEW LOCATION====================================== **/
      const addLocationConfig = async (setSubmitting, onClose, location) => {
        try {
        
          console.log("Request Payload:", location); 

          setSubmitting(true)

          await apiPostAuthorization("locations/add", location).then((res) => {
            console.log("Response Data:", res.data.data);
            //  const newLocation = res.data.data; 
            //  setUpdatedLocation(newLocation);
  
            onClose()
            toast.success(res.data.message)
            getLocations()
          });
          
        } catch (err) {
          console.error("API Error:", err); 
          console.log(err.response.data.message);
        } finally{
          setSubmitting(false)
        }
      };

      /**=========================================UPDATE LOCATION===================================== **/
      const updateLocationConfig = async (onClose, formData) => {
        try {
        
          await apiPut(`locations/update/${singleLocation.id}`, formData).then((res) => {
            console.log(res.data);
            onClose()
            getLocations()
          });
        } catch (err) {
          console.log(err.response.data.message);
        }
      };

      
     
      /**==========================================REMOVE LOCATION===================================== **/
      const deleteLocationConfig = async (location) => {
        try {
          if(location.id !== undefined)
          console.log(`id: ${location.id}`)

          await apiDeleteAuthorization(`locations/delete/${location.id}`).then((res) => {
            console.log(res.data);
            getLocations()
          });

        } catch (err) {
          console.log("Location could not be deleted!");
        }
      };

    
     /**===================================CALCULATE OPTIMAL ROUTE=================================== **/

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
    updateLocationConfig,
    setSingleLocation,
    deleteLocationConfig,
    headerTitle,
    setHeaderTitle,
    getSingleLocation,
    locationDetail,
    loading,
    error,
    setShowNavbar,
    showNavbar,
    }}>

    {children}
    </dataContext.Provider>
 )  
}

  export default DataProvider