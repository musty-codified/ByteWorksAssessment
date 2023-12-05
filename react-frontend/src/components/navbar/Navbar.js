import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/courier-logo.jpeg'
import { AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import { BsTwitter, BsInstagram} from "react-icons/bs"
import { ImFacebook} from "react-icons/im"
import { useContext } from 'react';
import { dataContext } from '../../context/AuthContext';

import './Navbar.css'


const Navbar = () => {
  const [sideBar, setSideBar] = useState(false);

  const {logout} = useContext(dataContext);  
  const getSignature = localStorage.getItem("signature")

  const handleSideBar = () => {
    setSideBar(!sideBar);
  };

  const handleLogout = () => {
    console.log("clicked")
    logout();
  };

  
  return (
    <nav className='header-nav'>
      <div className='nav--container'> 

    <div className='logo--container navbar-header'>

    <div onClick={handleSideBar} className="hidden md:block self-center w-[170px]">
          {sideBar ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>
      
       <img src={Logo} alt='Company logo' className='logo--img'/>
      <a href='/'> <h2>GEOBYTES LOGISTICS INC. </h2></a>
    </div>

    <ul className= 'm-3 nav '>
    <li> <Link className= "nav-link text-dark" to="/" >HOME</Link></li>
    <li> <Link className= "nav-link text-dark" to="/locations">LOCATIONS</Link></li>

        {
          !getSignature ? (<>
            <li> <Link className= "nav-link text-dark" to="/login" >LOGIN</Link></li>
           <li > <Link className= "nav-link text-dark" to="/register" >SIGNUP</Link></li> 
          </>) : (<><li><Link className= "nav-link text-dark" to="#" onClick={handleLogout}>LOGOUT</Link></li> </>)
        }
    <li > <Link className= "nav-link text-dark"to="#" >CONTACT</Link></li> 
    </ul>
      </div>

      <div className="d-flex gap-8 text-black">  
                  <Link className="text-white me-2" to="#">
                    <ImFacebook />
                  </Link>
                  <Link className="text-white me-2" to="#">
                    <BsTwitter />
                  </Link>
                  <Link className="text-white" to="#">
                    <BsInstagram />
                  </Link>
                </div>
    </nav>
  )
}

export default Navbar