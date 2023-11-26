import React, {useState, useContext} from 'react';
import {dataContext} from '../../context/AuthContext';
// import './activateUser.css'


const ActivateUser = () => {

    const {activateUserConfig} = useContext(dataContext)
    // console.log(activateUserConfig)

   const [activateUserData, setActivateUserData]= useState({
    
    email:"",
    token:""

})
   console.log(activateUserData)


    const handleChange=(event)=>{
    setActivateUserData(prevActivateUser=>{
        return {
            ...prevActivateUser,
            [event.target.name]:event.target.value,
        }
    })
};

    const handleSubmit= async (event)=>{ 
    event.preventDefault();

    await activateUserConfig(activateUserData)
    setActivateUserData({
     email:"",
     token: ""

  })
}

  return (
    <div>

        <form onSubmit={handleSubmit}>

        <p className="otp_span">Enter the token sent to your email to verify your account</p>

        <input 
       type="text" 
       placeholder="Email" 
       onChange={handleChange}
       name="email" 
       value={activateUserData.email}
       required/>
        
        <input 
       type="password" 
       onChange={handleChange}
       name="token"
       value={activateUserData.token}
       required/>


    

       <button type="submit" className='activate-btn'>Verify</button>

        </form>
    </div>
  )
}

export default ActivateUser