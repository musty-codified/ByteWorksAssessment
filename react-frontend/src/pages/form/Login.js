import React, {useState, useContext} from 'react'
import { dataContext } from '../../context/AuthContext'


const Login = () => {

  const {loginConfig} = useContext(dataContext)

const [loginForm, setLoginForm] = useState(
  {
    email:"",
    password:""

  })

  const handleChange=(event)=>{
      setLoginForm(prevLoginForm=>{
        return{
          ...prevLoginForm,
         [event.target.name]: event.target.value
        }
      })

  }

  const handleSubmit=(event)=>{
  event.preventDefault()
  loginConfig(loginForm)
  setLoginForm({
    email:"",
    password:""

  })


  }

  return (
    <div>

<form className='signup--form' onSubmit={handleSubmit}>

<h2 className="signup_h2">Login</h2>
<p className="signup_span">
        Enter your email and password  details to Login</p>
<input 
type="email" 
placeholder="Email" 
onChange={handleChange}
name="email"
value={loginForm.email}
required/>

<input 
type="password" 
placeholder="Password" 
onChange={handleChange}
name="password"
value={loginForm.password}
required/>

<button type="submit" onClick = {()=>loginConfig(loginForm)} className="signup_btn">
Sign in

</button>

<p>

Don't have an account? Sign up
<a href='/'>SignUp</a>
</p>
</form>

    </div>
  )
}

export default Login