import React from 'react'

import { useState, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import { dataContext } from '../../context/AuthContext'
import './SignupForm.css'

const SignupForm = () => {
  const {registerConfig} = useContext(dataContext)
  console.log(registerConfig)

const [signupFormData, setSignupFormdata] = useState({
     firstName: "",
     lastName: "", 
     email: "", 
     password: ""
})

const handleChange =(event)=>{
    console.log(signupFormData)

    setSignupFormdata(prevSignupFormData=>{
        return {
            ...prevSignupFormData,
            [event.target.name] : event.target.value
        }
    })
    // console.log(event.target.value)
}


const handleSubmit = async (event)=>{
  event.preventDefault()
  await registerConfig(signupFormData);
  console.log(signupFormData)
  setSignupFormdata({
    firstName: "",
    lastName: "",
    email: "",
    password:""
  });
}

  return (
    <div>
        <form className='signup--form' onSubmit={handleSubmit}>

        <h2 className="signup_h2">Sign Up</h2>
        <p className="signup_span">
                Enter your personal details to create account
              </p>

       <input 
       type="text" 
       placeholder="First Name" 
       onChange={handleChange}
       name="firstName"
       value={signupFormData.firstName}
       required/>
      
      <input 
       type="text" 
       placeholder="Last Name" 
       onChange={handleChange}
       name="lastName"
       value={signupFormData.lastName}
       required/>

     <input 
       type="email" 
       placeholder="Email" 
       onChange={handleChange}
       name="email"
       value={signupFormData.email}
       required/>

      <input 
       type="password" 
       placeholder="Password" 
       onChange={handleChange}
       name="password"
       value={signupFormData.password}
       required/>

       <button type="submit" onClick = {()=>registerConfig(signupFormData)} className="signup_btn">
       Sign Up

       </button>

       <p>

       Already have an account?
       <a href='/login'>Login</a>
       </p>
        </form>

        <ToastContainer />


    </div>
  )
}

export default SignupForm