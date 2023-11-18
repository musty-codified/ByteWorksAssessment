import React from 'react'

import { useState } from 'react'
import './SignupForm.css'

const SignupForm = () => {

const [signupFormData, setSignupFormdata] = useState({
    firstName: "",
     lastName: "", 
     email: "", 
     password: ""
})

const  handleChange =(event)=>{
    console.log(signupFormData)

    setSignupFormdata(prevSignupFormData=>{
        return {
            ...prevSignupFormData,
            [event.target.name] : event.target.value
        }
    })
    // console.log(event.target.value)
}


const handleSubmit =(event)=>{
  event.preventDefault()
  console.log(signupFormData)
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

       <button type="submit" className="signup_btn">
       Sign Up

       </button>

       <p>

       Already have an account?
       <a href='/login'>Login</a>
       </p>
        </form>



    </div>
  )
}

export default SignupForm