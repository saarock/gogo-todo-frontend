import React from 'react'
import "./gogodashbox.css";
import { GoProjectSymlink } from "react-icons/go";
const GoGoDashContainerBox = () => {
  return (
    <div className='gogo__dash__container__box'>
        <div className="gogo__dash__container__box__child">
            <h1>Total Project: <span className='gogo__imp__number'>500+</span></h1>
        </div>
        <div className="gogo__project__icon">
            <GoProjectSymlink/>
        </div>
    </div>
  )
}

export default GoGoDashContainerBox