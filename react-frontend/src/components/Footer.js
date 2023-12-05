import { BsTwitter, BsInstagram, BsClock, BsTelephone} from "react-icons/bs"
import { ImFacebook, ImLocation} from "react-icons/im"
import { Link } from "react-router-dom"


export const FooterCard = (props) =>{

    return(
        <div className="text-gray-600 ">
        <h6 className="font-bold mb-3 text-[#403414] text-[0.7rem] after:h-[4px] after:bg-black after:inline-block after:align-middle after:w-1/2 pull-left" >{props.heading}</h6>
        <div className="d-flex flex-column">
        <a href="/" className="text-[0.8rem] text-dark mb-1">{props.link1}</a>
        <a href="/" className="text-[0.8rem] text-dark mb-1">{props.link2}</a>
        <a href="/" className="text-[0.8rem] text-dark mb-1">{props.link3}</a>
        <a href="/" className="text-[0.8rem] text-dark mb-1">{props.link4}</a>
        </div>
      </div>
    )

}

const Footer = () => {
    return(
        <footer className="container-fluid bg-light mt-5 py-4 small">
        <div className="row justify-content-center">
          <div className="col-md-3 text-center">

            <h6 className="font-weight-bold text-[#403414] mb-3">ABOUT US</h6>
            <ImLocation /><p className="mb-2">Okhoromi community, Benin city, Edo state</p>

            <BsClock /><p className="mb-2">Sun - Sat: 9:00AM - 17:00PM</p>

            <BsTelephone /><p className="mb-2">+2348166099828</p>

            <div className="social-icons m-3">
              <Link to='#' className="me-2"><ImFacebook /></Link>
              <Link to='#' className="me-2 "><BsTwitter /></Link>
              <Link to='#' className="me-2"><BsInstagram /></Link>
            </div>
          </div>

          <div className="col-md-6">
          
            <div className="row ">
               <div className="col-md-4 ">
              <FooterCard heading="OTHER PAGES" link1= "Home" link2="About Us" link3="Contact" />
              </div>

              <div className="col-md-4">
              <FooterCard heading="QUICK LINKS" link1="Returns & Refunds" link2="Package Tracking"  />         
                </div>

               <div className="col-md-4">
              <FooterCard heading="INFORMATION" link1="Privacy Policy" link2="Terms of Service" link3="Disclaimer" link4="FAQ" />
              </div>
            </div>
            
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-md-6 text-center">
            <h6 className="text-[1.7rem] font-bold text-[#403414]">GEOBYTES</h6>
          </div>
          <div className="col-md-6 text-center d-flex justify-content-center">
            <p className="text-[0.8rem] me-3"><Link to='/'>PRIVACY</Link></p>
            <p className="text-[0.8rem] me-3"><Link to='/'>HELP</Link></p>
            <p className="text-[0.8rem] me-3"><Link to='/'>TERMS</Link></p>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-md-6 text-center">
            <p className="text-[0.8rem]">Copyright &#169; 2023. All Right Reserved.</p>
          </div>
        </div>
      </footer>
    );
}


export default Footer;