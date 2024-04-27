
import React, { useState, createContext} from 'react'
import {
  apiPost,
  apiGet, 
  apiPut,
  apiPostAuthorization,
  apiDeleteAuthorization,
}
from "../utils/api/Axios.js"



import {
  errorNotification,
  successNotification
} from  '../components/Notification.js';



import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {decodeJwt, redirectToUserPage } from '../utils/RoleUrlRouter.js';


export const dataContext = createContext();

  const DataProvider=({children})=>{

    const [viewLocations, setViewLocations] = useState([]);
    const [locationDetail, setLocationDetail] = useState({});
    const [routeDetail, setRouteDetail] = useState({});

    const[locationsUrl, setLocationsUrl] = useState("locations/view-list")
    const[pageNumber, setPageNumber] = useState(0)
    const[pageElementSize, setPageElementSize] = useState(0)
    const[totalPages, setTotalPages] = useState(0)
    const[totalElements, setTotalElements] = useState(0)
    const[numOfElements, setNumOfElements] = useState(0)
    const[localStorageValue, setLocalStorageValue] = useState(false);
    const[singleLocation, setSingleLocation] = useState([])

    const[headerTitle, setHeaderTitle] = useState("Add New Location");

    const[updatedLocation, setUpdatedLocation] = useState([])

    // const [getUser, setGetUser] = useState({});
    const [showNavbar, setShowNavbar] = useState(true)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);

    // const[findRouteUrl, setFindRouteUrl] = useState("routes/optimal-route")

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
        // toast.success(res.data.message)
        successNotification(res.data.data)
        console.log(res.data.data);

        setTimeout(() => {
          window.location.href = "/check-mail";
        }, 1500); 
      });

    }catch (err) {
      // toast.error(err.response.data.error)
      errorNotification(err.response.data.message)
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


 const loginConfig = async (loginFormData, location, navigate) => {
  
   try {
      const loginData = {
      email: loginFormData.email,
      password: loginFormData.password,
    };

    const res = await apiPost("auth/login", loginData);

    if (res.data.message === "login successful") {
      toast.success(res.data.message);
      console.log(res.data)

      const jwtInfo = decodeJwt(res.data.data.token);
      localStorage.setItem("signature", res.data.data.token);
      localStorage.setItem("roles", jwtInfo.roles);

      setLocalStorageValue(localStorage.getItem("signature"));
      redirectToUserPage(location, navigate, jwtInfo.roles)

    } 
    else {
      // toast.success(res.data.message);
      successNotification(res.data.data)
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  } catch (err) {
    console.error('Error during login:', err);
    toast.error(err.response.data.error)
    // errorNotification(err.responose.data.message)


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
       setLoading(true)
      await apiGet(allLocationsUrl).then((res)=>{
        const data = res.data.data
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


   /** ======================================VIEW SINGLE LOCATION================================== **/
   const getSingleLocation = async(id) =>{

       await apiGet(`locations/${id}`).then((res)=>{
        const data = res.data
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
            console.log("Server Response:", res);

             console.log("Response Data:", res.data.data);
  
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
     const getOptimalRoute = async(queryParams) =>{
    
         setLoading(true)
        await apiGet(`routes/optimal-route${queryParams}`).then((res)=>{
          const data = res.data.data
          console.log(data)
          setRouteDetail(data)
         })
         .catch((err) => {
          setError(err)
      }).finally(
        setLoading(false)
      );
  
    };
  

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
    getOptimalRoute,
    // setFindRouteUrl,
    routeDetail,
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
    updatedLocation
    }}>

    {children}
    </dataContext.Provider>
 )  
}

export const useAuth = () => {
  const context = React.useContext(dataContext);
  if (context === "undefined") {
    throw new Error("useAuth must be used within the auth provider");
  }
  return context;
};

  export default DataProvider