import React from 'react'

import { useState, useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { dataContext } from '../../context/AuthContext'
import Loader from '../../components/Loader/Loader';
import FormCard from '../../components/card/FormCard'
import './SignupForm.css'

// import registerbg from '../../assets/images/registerbg.jpg'

const SignupForm = () => {
  
     const {registerConfig} = useContext(dataContext)
     const [signupFormData, setSignupFormdata] = useState({
        firstName: "",
        lastName: "", 
        email: "", 
        password: ""
   })
   
   const [isLoading, setIsLoading]= useState(false)
   
   const handleChange =(event)=>{
       console.log(signupFormData)
       setSignupFormdata(prevSignupFormData=>{
        return {
            ...prevSignupFormData,
            [event.target.name] : event.target.value
        }
    })
}
  
   const handleSubmit = async (event)=>{
    event.preventDefault()
    setIsLoading(true)
    await registerConfig(signupFormData);
    setIsLoading(false)
    setSignupFormdata({
    firstName: "",
    lastName: "",
    email: "",
    password:""
    });
}

  return (
    <div className='signup--container'>

        <div className='signup--backdrop'>
           {/* <img src={registerbg} alt=''/> */}
          </div>

        <FormCard>
        <form className='signup--form' onSubmit={handleSubmit}>

        <h2 className="signup--heading">Sign Up</h2>
        <p className="signup--span"> Create an account</p>

       <input 
            type="text" 
            placeholder="First Name" 
            onChange={handleChange}
            name="firstName"
            value={signupFormData.firstName}
            required/>
       <br/>
      
      <input 
           type="text" 
           placeholder="Last Name" 
           onChange={handleChange}
           name="lastName"
           value={signupFormData.lastName}
           required/>
       <br/>

     <input 
          type="email" 
          placeholder="Email" 
          onChange={handleChange}
          name="email"
          value={signupFormData.email}
          required/>
        <br/>


      <input 
           type="password" 
           placeholder="Password" 
           onChange={handleChange}
           name="password"
           value={signupFormData.password}
           required/>
      <br/>

       <button type="submit" onClick = {()=>registerConfig(signupFormData)} className="signup--btn">
              Sign Up
         </button>

       <p>
       Already have an account?
       <a href='/login'> Login</a>
       </p>
        </form>
        </FormCard>
        {isLoading && <Loader/>}

        <ToastContainer />

    </div>
  )
}

export default SignupForm