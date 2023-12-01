import React, {useContext, useState} from 'react'
import {dataContext} from '../../context/AuthContext';
import './ResendToken.css'


const ResendToken = () => {

  const {resendToken} = useContext(dataContext)
  const [resendTokenData, setResendTokenData] = useState({
    email:"",
    subject:""

  });

  console.log(resendTokenData.subject)


  const handleResendOTP=(event)=>{
    console.log(resendTokenData)

    const {name, value} = event.target
    setResendTokenData(prevResendTokenData=>{
      return {
        ...prevResendTokenData,
        [name]: value
      }
    })

    
};
   const handleSubmit = async(event)=>{
       event.preventDefault()
       const queryParams = `?email=${resendTokenData.email}&reason=${resendTokenData.subject}`;
    await resendToken(queryParams)
    setResendTokenData({
     email:"",
     subject: ""

  })

   }

  return (
    
    <div className='otp--bg'>

    <form onSubmit={handleSubmit} className='otp--form'>

    <h2 className="otp--h2">Resend Token</h2>
        <p className="otp--span">Kindly enter your reason for requesting token resend</p>
     
    <input 
   type="text" 
   placeholder="Enter email" 
   onChange={handleResendOTP}
   name="email"
   value={resendTokenData.email}
   required/>

 <label htmlFor="reasonDropdown">Select a reason:</label>
 <select 
  id="reasonDropdown"
  value={resendTokenData.subject}
  onChange={handleResendOTP}
  name="subject"
 >

   <option value="" >-- Select a reason --</option>
   <option value="verify_email">Verify Email</option>
   <option value="reset_password"> Reset Password</option>
   <option value="expired_token">Expired Token</option>

 </select>
 <br/>
 <br/>
 <button className='otp--btn'> Resend Token </button>
      
      </form>

      </div>

  )
}

export default ResendToken


