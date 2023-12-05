import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/images/courier-logo.jpeg'

import Navbar from "../../components/navbar/Navbar";
import './HeaderComponent.css'


const HeaderComponent = () =>{

    const HEADER_PRIMARY_TEXT = "GEOBYTES INC.";
    const HEADER_SECONDARY_TEXT = "Far far away, Bringing your packages to your door steps";
    

    return(
        <header >
            <Navbar/>
            <div className="container heading">

                <div className=" p-2 gap-2 md: lg:text-left">

                   <a href="/nav"><h3 className="font-bold">{HEADER_PRIMARY_TEXT}</h3></a>

                    <p className="mb-5 ">{HEADER_SECONDARY_TEXT}</p>
                    
                    <Link to="/" className=" bg-black text-white ">Delivery now</Link>

                    <div className="header-container">

                    <div className="heading-image">
                        {/* <img className="" src={ Logo} alt="" /> */}
                        {/* <img className="w-[200px] ml-[-4rem] " src="" alt="#" /> */}

                    </div>

                </div>

                </div>
               
            </div>
        </header>
    );
}

export default HeaderComponent;