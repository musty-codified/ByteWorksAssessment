import React from "react";
import { Link } from "react-router-dom";
import './Hero.css'
import Card from '../../components/card/Card'

const Hero = () =>{

    const HEADER_PRIMARY_TEXT = "...Optimized Delivery";
    const HEADER_SECONDARY_TEXT = "Discover Cost-Effective Solutions To All Your Delivery Needs";
    
    return(

        <section>

            <Card>

            <div className="hero-container">

                <div className="text-caption">

                   <a href="/"><h3 className="hero-text">{HEADER_PRIMARY_TEXT}</h3></a>

                    <p className="hero-caption ">{HEADER_SECONDARY_TEXT}</p>
                    
                    <Link to="#" className="order-text">ORDER NOW</Link>
                </div>
               
            </div>

            </Card>
        </section>
    );
}

export default Hero;