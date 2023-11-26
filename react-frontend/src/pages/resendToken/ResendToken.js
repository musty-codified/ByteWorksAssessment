import React, {useContext, useState} from 'react'
import {dataContext} from '../../context/AuthContext';



const ResendToken = ({onResendToken}) => {

  const {resendToken} = useContext(dataContext)
  const [selectedReason, setSelectedReason] = useState("");
  console.log(selectedReason)


  const handleResendOTP=(event)=>{

    const {name, value} = event.target
    setSelectedReason(prevSelectedReason=>{
      return {
        ...prevSelectedReason,
        [name]: value
      }
    })


    if (selectedReason) {
      onResendToken(selectedReason);
    } else {
      // Handle case where no reason is selected
      alert('Please select a reason for resending the token.');
    }

    // resendToken()
    
};


const handleSubmit=(event)=>{
  event.preventDefault();
  const email = localStorage.getItem("signature");
  resendToken(email, selectedReason)

}

  return (
    <div>
     
      <label htmlFor="reasonDropdown">Select a reason:</label>
      <select>

        id="reasonDropdown"
        value={selectedReason}
        onChange={handleResendOTP}
        name="selectedReason"

        <option value="">-- Select a reason --</option>
        <option value="verify_email">Verify Email</option>
        <option value="reset_password"> Reset Password</option>
        <option value="expired_token">Expired Token</option>

      </select>
      
      
      </div>
  )
}

export default ResendToken