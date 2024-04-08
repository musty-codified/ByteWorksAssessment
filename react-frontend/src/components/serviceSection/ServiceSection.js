import React from 'react'
import { Container, Row, Col, Nav, Tab} from 'react-bootstrap';
import ServiceCard from './ServiceCard';
import serviceImg from '../../assets/images/delivery-man.png'


import 'animate.css'
import TrackVisibility from 'react-on-screen'; 
import './ServiceSection.css'


const ServiceSection = () => {
    const services = [ 
        {
            title: "Ecommerce store", 
            description: "Your ecommerce shopping",
            imgUrl: serviceImg, 
        }, 

        {
            title: "Route Service", 
            description: "Your one stop shop for all your service delivery",
            imgUrl: serviceImg, 
        }, 

        {
            title: "Courier Service", 
            description: "Receive your package in matter of hours",
            imgUrl: serviceImg, 
        }, 
] ;

  return (
      <section className='services' id='project'>
        <Container>
         <Row>
          <Col>
          <TrackVisibility>
          {({ isVisible }) =>
          <div className={isVisible ? "animate__animated animate__slideInUp" : ""}>
          <h2>OUR SERVICE OFFERINGS</h2>
          <p> It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>}
          </TrackVisibility>

          <Tab.Container id = "services-tabs" defaultActiveKey='first'>

    <Tab.Content>
        <Tab.Pane eventKey="first">
            <Row>
            {
                services.map((service, index)=>{
                    return (
                        <ServiceCard key ={index} {...service}/>
                    )
                })
            }
            </Row>

        </Tab.Pane>
        <Tab.Pane eventKey="second">Lorem Ipsum </Tab.Pane>
        <Tab.Pane eventKey="third">Lorem Ipsum </Tab.Pane>
       </Tab.Content>
       </Tab.Container>
          </Col>

         </Row>

        </Container>
        
         {/* <img className='background-image-right' src={colorSharp2} alt=''/> */}

      </section>
    )
}

export default ServiceSection