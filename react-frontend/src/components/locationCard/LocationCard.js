import { Link } from "react-router-dom";
import './LocationCard.css'
import jumbotron from '../../assets/images/jumbotronbg.jpg'

const LocationCard = ({id, lName, clearingCost}) =>{
    return(
                <div className="location-card">
                    <img src={jumbotron} alt="jumbotron display" className="location--image"/>

                    <div className="location-info">
                    <span className="gray name-badge">{lName}</span>
                    </div>
                    <p className="clearing-cost"><span className="bold"> From ${clearingCost}</span> / delivery</p>

                    <Link className="" to={`/locations/${id}`}> ORDER NOW &#8594;</Link>
            </div>
        
    );
}

export default LocationCard;

