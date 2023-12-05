import React, {useState, useContext} from 'react'
import { dataContext } from '../../context/AuthContext'
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {loginConfig} = useContext(dataContext)

  const [loginForm, setLoginForm] = useState(
  {
    email:"",
    password:""

  })

  const handleChange=(event)=>{
    console.log(loginForm)
      setLoginForm(prevLoginForm=>{
        return{
          ...prevLoginForm,
         [event.target.name]: event.target.value
        }
      })

  }

  const handleSubmit= async(event)=>{
  event.preventDefault()
 await loginConfig(loginForm, location, navigate)
  setLoginForm({
    email:"",
    password:""

  })

  }

  return (
    <div className="login--container">

  <form className='login--form' onSubmit={handleSubmit}>

  <h2 className="login--h2">Login</h2>
     <p className="login_span">Enter your email and password details to Login</p>
<input 
type="email" 
placeholder="Email" 
onChange={handleChange}
name="email"
value={loginForm.email}
required/>
<br/>

<input 
type="password" 
placeholder="Password" 
onChange={handleChange}
name="password"
value={loginForm.password}
required/>

<br/>
<button type="submit" onClick = {()=>loginConfig(loginForm)} className="login--btn">
Sign in
</button>

<p className='login_small mb-0"'>
Don't have an account? 
<a href='/register'> Signup</a>
</p>
</form>

<ToastContainer />
    </div>
  )
}

export default Login