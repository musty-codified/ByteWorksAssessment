import React from "react";
import { Link } from "react-router-dom";
import './Hero.css'
import Card from '../../components/card/Card'

const Hero = () =>{

    const HEADER_PRIMARY_TEXT = "OPTIMIZED DELIVERY";
    const HEADER_SECONDARY_TEXT = "Discover Cost-Effective Solutions To All Your Delivery Needs";
    const getSignature = localStorage.getItem("signature");

    return(

        <section>

            <Card>

            <div className="hero-container">

                <div className="text-container">

                <a href="/"><h2 className="primary-text">{HEADER_PRIMARY_TEXT}</h2></a>

                    <p className="secondary-text ">{HEADER_SECONDARY_TEXT}</p>

                           
                            { 
                               !getSignature ? (<>
                    
                                <Link to="/login" className="order-button">ORDER NOW</Link>
            
                                </>) : null
                            
                            }
                </div>
               
            </div>

            </Card>
        </section>
    );
}

export default Hero;