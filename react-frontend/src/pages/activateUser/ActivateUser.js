import React, {useState, useContext} from 'react';
import {dataContext} from '../../context/AuthContext';
import FormCard from '../../components/card/FormCard';
import './ActivateUser.css'


const ActivateUser = () => {

    const {activateUserConfig} = useContext(dataContext)
    // console.log(activateUserConfig)

   const [activateUserData, setActivateUserData]= useState({
    email:"",
    activationToken:""

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
     activationToken: ""

  })
}

  return (
    <div className='activate--container'>

   <FormCard>
    <form onSubmit={handleSubmit} className='activate--form'>

      <p className="otp--span">Enter the token sent to your email to verify your account</p>

   <input 
         type="text" 
         placeholder="Email" 
         onChange={handleChange}
         name="email" 
         value={activateUserData.email}
         required/>
   
   <input 
         type="text" 
         onChange={handleChange}
         name="activationToken"
         value={activateUserData.activationToken}
         required/>
   
      <button type="submit" className='activate--btn'>Verify</button>

    </form>
    </FormCard>

    </div>
  )
}

export default ActivateUser