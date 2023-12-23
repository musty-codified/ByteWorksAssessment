import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'

import { AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import { BsTwitter, BsInstagram} from "react-icons/bs"
import { ImFacebook} from "react-icons/im"
import { useContext } from 'react';
import { dataContext } from '../../context/AuthContext';
import './Navbar.css'


const Navbar = () => {

  const {logout} = useContext(dataContext);  
    // const [sideBar, setSideBar] = useState(false);
  // const { getUser, GetUser } = useContext(dataContext);

  const getSignature = localStorage.getItem("signature");
  const getRoles = localStorage.getItem("roles");
  // const handleSideBar = () => {
  //   setSideBar(!sideBar);
  // };

  const handleLogout = () => {
    logout();
  };

  const activeStyles ={
    fontWeight: "bold",
    textDecoration: "underline",
    color: "red"
  };

  return (
    <>
    <nav className='header-nav'>
      <div className='nav--container'> 
        <div className='logo--container'>

    {/* <div onClick={handleSideBar} className="hidden md:block self-center w-[170px]">
          {sideBar ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div> */}
      
        <img src={Logo} alt='company logo' className='logo'/>
         <a href='/'> <h1>GEOBYTES EXPRESS</h1></a>
         </div>
            <ul className= 'm-2 nav'>
            {/* <li><NavLink className= "nav-link text-dark" 
             to="/"
             end
            style={({isActive})=> isActive ? activeStyles : null}
            >HOME</NavLink>
            </li> */}

              {
                getRoles=== "USER_DELETE,USER_EDIT,USER_READ" ? (<>
                
                <li><NavLink className= "nav-link text-dark" 
                to="/admin"
                 //  end
                 style={({isActive})=> isActive ? activeStyles : null}
                 >ADMIN</NavLink>
                 </li>
                
                </>):null
              
              }
           
            <li><NavLink className= "nav-link text-dark"
                 to="/about"
                 style={({isActive})=> isActive ? activeStyles : null}
                 >ABOUT</NavLink>
              </li>

            <li> <NavLink className= "nav-link text-dark" 
              to="/locations"
              style={({isActive})=> isActive ? activeStyles : null}
             >LOCATIONS</NavLink>
            </li>
        
        {
          !getSignature ? (<>
            <li> <NavLink className= "nav-link text-dark"
              to="/login"
              style={({isActive})=> isActive ? activeStyles : null}
             >LOGIN</NavLink>
             </li>

            <li> <NavLink className= "nav-link text-dark" 
             to="/register"
             style={({isActive})=> isActive ? activeStyles : null}
            >SIGNUP</NavLink>
            </li> 

          </>) :
            (<><li><NavLink className= "nav-link text-dark" 
            to="#" onClick={handleLogout}
            style={({isActive})=> isActive ? activeStyles : null}
            >LOGOUT</NavLink>
            </li></>)
         }
             </ul>
             </div>

     </nav>
     </>
  )
}

export default Navbar