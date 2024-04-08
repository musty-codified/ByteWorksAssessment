import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'

import { AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import { useContext } from 'react';
import { dataContext } from '../../context/AuthContext';
import Menu from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import './Navbar.css'

const Navbar = () => {

  const {logout, getOptimalRoute, routeDetail} = useContext(dataContext);  
    const [sideBar, setSideBar] = useState(false);

  const getSignature = localStorage.getItem("signature");
  const getRoles = localStorage.getItem("roles");

  const handleSideBar = () => {
    setSideBar(!sideBar);
  };

  const handleLogout = () => {
    logout();
  };


  const handleCalculateRoute=()=>{
    console.log("Calculate Route was clicked")


  }

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "red"
  };

  return (
    <>
    <nav className='header--nav'>
      <div className='nav--container'> 
        <div className='logo--container'>

    {/* <div onClick={handleSideBar} className="hidden md:block self-center w-[170px]">
          {sideBar ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div> */}
        <Menu className="icon" onClick={ handleSideBar }>
        {sideBar ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </Menu>
        <img src={Logo} alt='company logo' className='logo'/>
         <a href='/'> <h1>GEOBYTES EXPRESS</h1></a>

         </div>
            <ul className= 'm-2 nav'>
              {
                getRoles === "USER_DELETE,USER_EDIT,USER_READ" ? (<>
                
                <li><NavLink className= "nav-link text-dark" 
                   to="/admin"
                   end
                   style={({isActive})=> isActive ? activeStyles : null}
                 >ADMIN</NavLink>
                 </li>
                
                </>):
                
                (<>
                <li><NavLink className= "nav-link text-dark" 
                   to="/"
                   style={({isActive})=> isActive ? activeStyles : null}
                 >HOME</NavLink>
                 </li>

                 <li><NavLink className= "nav-link text-dark"
                 to="/about"
                 style={({isActive})=> isActive ? activeStyles : null}
                 >ABOUT US</NavLink>
                 </li>

                 <li><NavLink className= "nav-link text-dark" 
                   to="/contact"
                   style={({isActive})=> isActive ? activeStyles : null}
                 >CONTACT</NavLink>
                 </li>
                 
                 </>)
              
              }
           

            <li> <NavLink className= "nav-link text-dark" 
              to="/locations"
              style={({isActive})=> isActive ? activeStyles : null}
             >LOCATIONS</NavLink>
            </li>

            <li><NavLink className= "nav-link text-dark" 
            to="#" onClick={handleCalculateRoute}
            style={({isActive})=> isActive ? activeStyles : null}
            >
              ROUTE CALCULATOR
              </NavLink>
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
            >
            <ExitToAppIcon className="icon" />

              LOGOUT
              </NavLink>
            </li></>)
         }
             </ul>
             </div>

     </nav>
     </>
  )
}

export default Navbar