import React from 'react'
import './FormCard.css'
const FormCard = ({children}) => {

  return (
    <div className='form--card container'>

    {children}

    </div>
  )
}

export default FormCard