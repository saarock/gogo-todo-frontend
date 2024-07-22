import React from 'react'
import { TrophySpin } from 'react-loading-indicators'
import "./loader.css"

const Loader = () => {
  return (
    <div className='gogo__loader'>
      <TrophySpin color="#db3c63" size="medium" text="" textColor="" />
    </div>
  )
}

export default Loader