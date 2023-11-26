import { MdMarkEmailRead } from "react-icons/md";
import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {dataContext} from '../../context/AuthContext';



const CheckMail = () => {

    const {resendToken} = useContext(dataContext)


    const handleResendOTP=()=>{

        const key = localStorage.getItem("signature")
       resendToken(key, )

    }
    
   

  return (

    <div className="w-[100%] h-[100vh] flex justify-center items-center mt-[4rem] p-5">
            <div className="w-[700px] h-[500px] p-5 bg-[#ebebeb] text-justify text-[black] flex flex-col justify-center item-center gap-4">
                < MdMarkEmailRead className="text-[15rem] self-center text-[green]" />
                <div className="flex flex-col gap-4">
                    <p className="text-center text-[1.5rem] font-bold">Verification link has been sent to your registered email, 
                        Check your email to confirm registration
                    </p>
                    <div className="flex justify-center items-center">
                        <span>Did not recieve Verification link? <Link to='/resend-token' className="text-[#9b7d0f]" onClick={handleResendOTP}>Resend token</Link> </span>
                    </div>
                    <div className="flex justify-center items-center">
                        <span> Verified? </span> <Link to='/activate'>Proceed to Login</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CheckMail