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
    <div className='signup--bg'>
        <form className='signup--form' onSubmit={handleSubmit}>

        <h2 className="signup--h2">Sign Up</h2>
        <p className="signup--span"> Enter your personal details to create account</p>

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

        <ToastContainer />

    </div>
  )
}

export default SignupForm