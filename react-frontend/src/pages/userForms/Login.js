import React, {useState, useContext} from 'react'
import { dataContext } from '../../context/AuthContext'
import { useNavigate, useLocation} from "react-router-dom";
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import FormCard from '../../components/card/FormCard';
import Loader from '../../components/Loader/Loader';
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {loginConfig} = useContext(dataContext)

  const [loginFormData, setLoginFormData] = useState(
  {
    email:"",
    password:""

  })
  const [isLoading, setIsLoading] = useState(false);


     const handleChange=(event)=>{
       console.log(loginFormData)
       setLoginFormData(prevLoginForm=>{
          return{
          ...prevLoginForm,
         [event.target.name]: event.target.value
        }
      })

  }
       
       const handleSubmit= async(event)=>{
       event.preventDefault()
       setIsLoading(true)
       console.log(location)
       await loginConfig(loginFormData, location, navigate)
       setIsLoading(false)
       setLoginFormData({
                email:"",
                password:""
    })

  }
  // const showMessage = location.state?.message;
  // console.log(showMessage) 

     return (
          <div className="login--container">
           <FormCard>

              <form className='login--form' onSubmit={handleSubmit}>
               <h1 className="login--heading">Log in to your account</h1>
                      <input 
                           type="email" 
                           placeholder="Email address" 
                           name="email"
                           onChange={handleChange}
                           value={loginFormData.email}
                           required/>
   
                      <input 
                          type="password" 
                          placeholder="Password" 
                          name="password"
                          onChange={handleChange}
                          value={loginFormData.password}
                          required/>

                      <button type="submit" onClick = {()=>loginConfig(loginFormData)} className="login--btn">
                           Sign in
                      </button>
                       
                       <p className='login_small mb-0"'>
                       Don't have an account? 
                       <a href='/register'> Signup</a>
                       </p>
                       </form>
                   {isLoading && <Loader/>}
                 </FormCard>
               <ToastContainer />
               {location.state && location.state.message && <p>{location.state.message}</p>}

                   </div>
           )
   }
   
   export default Login