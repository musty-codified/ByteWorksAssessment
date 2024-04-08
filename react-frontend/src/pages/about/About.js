import {Fragment, React, useState} from 'react'
import { Link } from 'react-router-dom'
import box from "./aboutImages/package-delivery.jpg"
import './About.css'

const About = () => {

  const [toggleTab, setToggleTab] = useState(1);
  const toggleState =(index)=>{
    setToggleTab(index);
  };


  return (

    <Fragment>

    <section className="about-page-container">
      <div className='about-page-row'>
         <div className="about-page-column1">
            <img
              className='about-img'
              src={box}
              alt="about-img"
            />
          </div>

          <div className="about-page-colum">

            <div className='tabs'>
              <div
              className={              
                    toggleTab === 1 ? "single-tab active-tab" : "single-tab"
            }
            onClick={() => toggleState(1)}

              >
                <h2 className="about-page-cta">About</h2>

              </div>

              <div
                className={
                  toggleTab === 2 ? "single-tab active-tab" : "single-tab"
                }
                onClick={() => toggleState(2)}
              >
                <h2 className="about-page-cta">Skill</h2>
              </div>

              <div
                className={
                  toggleTab === 3 ? "single-tab active-tab" : "single-tab"
                }
                onClick={() => toggleState(3)}
              >
                <h2 className="about-page-cta">Experience</h2>
              </div>

            </div> 
            {/* end of tabs div */}


            <div className="tab-content">
              <div
                className={
                  toggleTab === 1 ? "content active-content" : "content"
                }
              >
                <h2>Our Story</h2>
                <p>
                  {" "}
                  GeoByte Inc is a leading Nigerian-based courier and logistics company with focus on safe
                  and fast delivery of items to destinations across the globe.
                  Our knowledgeable and friendly staff are always available to help you find the optimal 
                  route for delivering your packages to your home. 
                </p>

                <h3>GeoBytes Inc. Your Imagination at your doorstep</h3>
                <p>
                  GeoByte Inc needs a software solution, accessible from browsers where staff can set up
                  locations, select an origin and destination and view the best route to take in delivering
                  packages from the origin to the destination. We also offer tacking services and aame day
                  delivery, so if you want a cost-effective solution to all your delivery needs, we
                  can help bring it to life. 
                </p>
              </div>

              <div
                className={
                  toggleTab === 2 ? "content active-content" : "content"
                }
              >
                <h2>Our vision & mission</h2>
                <p>
                  {" "}
                  <h4>Vision:</h4>
                  Our vision is to provide our customers with an unparalleled
                  delivery options from all around the world, at cost-effective prices. 
                  We are committed to offering exceptional customer service and at Geobytes, 
                  our vision is to be the leading courier and logistics companyacross the globe.

                  <h4>Mission:</h4>
                  With recent global developments that have affected the ease and cost of moving packages
                  across cities and countries, Our mission is to optimize delivery costs and speed of delivery.
                  
                </p>

            <div className="service-row">

                 <div className="service-colum">
                   <div className="progress-wrap">
                     <h3>Same Day Delivery</h3>
                     <div className="progress">
                       <div className="progress-bar">
                         <span>100%</span>
                       </div>
                     </div>
                   </div>
                 </div>

                <div className="service-colum">
                  <div className="progress-wrap">
                    <h3>Tracking</h3>
                    <div className="progress">
                      <div className="progress-bar">
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="service-colum">
                  <div className="progress-wrap">
                    <h3>Reliabity</h3>
                    <div className="progress">
                      <div className="progress-bar sql">
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                </div>
                {/* End of tab-content div */}

             </div>

           </div> 

           <div
                className={
                  toggleTab === 3 ? "content active-content" : "content"
                }
              >
                <div className="exp-column">
                  <h3>
                    Express Delivery At your Doorstep
                  </h3>

                  <p>
                    At Oakland Furniture, we have honed our skills in providing
                    high-quality delivery to our customers.
                  </p>
                </div>

                <div className="exp-column">
                  <h3>Courier And Logistic Service</h3>

                  <p>
                   We are also experts in custom ordering and furniture design and can help
                    customers create unique pieces that perfectly match their
                    individual style.
                  </p>
                </div>

                <div className="exp-column">
                  <h3>Distribution and Shipping</h3>
                  <p>
                    Geobytes Inc is a well-versed provider of high-quality
                    overseas Shipping. Our years of experience in the
                    industry has given us a deep understanding of the unique
                    , and we use this knowledge to carefully select the best routes for
                    our customers. 
                  </p>
                </div>
                  {/* End of exp-column div */}
              </div>
             </div>
             </div>
              </div>

        </section>
    </Fragment>
  
    
  );
};

export default About;