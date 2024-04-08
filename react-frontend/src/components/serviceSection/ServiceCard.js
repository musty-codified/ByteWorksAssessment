import React from 'react'
import { Col } from 'react-bootstrap'

const ServiceCard = (props) => {
  return (
    <Col xs={6} md ={4}>
    <div className='service-img-box'>
        <img src={props.imgUrl} alt=''/>
        <div className='service-text'>
            <h4>{props.title}</h4>
            <span>{props.description}</span>

        </div>

    </div>
    </Col>
  )
}

export default ServiceCard