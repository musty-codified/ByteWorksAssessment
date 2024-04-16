import { BsTwitter, BsInstagram, BsClock, BsTelephone} from "react-icons/bs"
import { ImFacebook, ImLocation} from "react-icons/im"
import { Link } from "react-router-dom"
import './Footer.css'


export const FooterCard = (props) =>{

    return(
        <div className="text-gray-600 ">
        <h6 className="font-bold mb-3 text-[#403414] text-[0.7rem] after:h-[4px] after:bg-black after:inline-block after:align-middle after:w-1/2" >{props.heading}</h6>
        {/* <div className="d-flex flex-column"> */}
        <a href="/" className="text-[0.8rem] text-dark mb-1 footer-link"><p>{props.link1}</p></a>
        <a href="/about" className="text-[0.8rem] text-dark mb-1 footer-link"><p>{props.link2}</p></a>
        <a href="/contact" className="text-[0.8rem] text-dark mb-1 footer-link"><p>{props.link3}</p></a>
        <a href="/" className="text-[0.8rem] text-dark mb-1 footer-link"><p>{props.link4}</p></a>

        
        {/* </div> */}
      </div>
    )

}

const Footer = () => {
    return(
        <footer className="footer container bg-light mt-5 py-4 small">
         <div className="row justify-content-center">
          <div className="col-md-3 text-center">

            <h6 className="font-weight-bold text-[#403414] mb-3">ABOUT US</h6>

          <div className='flex gap-2 items-center'>
              <span className=''>< ImLocation /></span><span>Okhoromi community, Benin city, Edo state</span>
          </div>

            <div className='flex gap-2 items-center'>
             <span className=''>< BsClock /></span><span>Sun - Sat: 9:00AM - 17:00PM</span>
            </div>

            <div className='flex gap-2 items-center'>
              <span className=''>< BsTelephone /></span><span>+2348166386376</span>
            </div>

            <div className="social-icons m-3">
              <Link to='#' className="me-2"><ImFacebook /></Link>
              <Link to='#' className="me-2 "><BsTwitter /></Link>
              <Link to='#' className="me-2"><BsInstagram /></Link>
            </div>
          </div>
          
          <div className="col-md-6">
          
              <div className="row">
              <div className="flex gap-[3rem] md:gap-[5rem] mb-5 text-gray-600 justify-between col-md-4">
              <FooterCard heading="OTHER PAGES" link1= "Home" link2="About Us" link3="Contact" />
              </div>

              <div className="col-md-4">
              <FooterCard heading="QUICK LINKS" link1="Returns & Refunds" link2="Package Tracking"  />         
              </div>

              <div className="col-md-4">
              <FooterCard heading="INFORMATION" link1="Privacy & Policy" link2="Terms of Service" link3="Disclaimer" link4="FAQ" />
              </div>
            </div>
            
          </div>
        </div>
        <div className="row justify-content-center mt-4 flex gap-4">
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
          <div className="text-center self-center mt-4">
            <p className="text-[0.8rem]">Copyright &#169; 2023. All Right Reserved.</p>
          </div>
        </div>
      </footer>
    );
}


export default Footer;