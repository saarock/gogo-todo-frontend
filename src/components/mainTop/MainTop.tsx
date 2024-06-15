import React from 'react'
import "./maintop.css"
import { FaPlayCircle } from "react-icons/fa";
const MainTop = () => {
    return (
        <div className='gogo__main__top'>
            <div className='gogo__main__top__left'>
                <div className="gogo__main__top__left__content">
                    <p>BEST DESTINATION FOR THE TASK MANAGEMENT SYSTEM</p>
                </div>
                <div className="gogo__main__top__left__title">
                    <h1>Travel, enjoy and live a new project life with <span> gogo.com  </span> </h1>
                </div>
                <div className="gogo__main__top__left__para">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, facere?</p>
                </div>

                <div className="gogo__main__top__left__buttons">
                    <button>Find out more</button>
                    <div className="gogo__play__button">
                        <span><FaPlayCircle /></span><button>Play demo</button>
                    </div>
                </div>
            </div>

            <div className='gogo__main__top__right'>
                <div className="goog__main__top__right__image">
                    <img src="
                  ./images/a.png" alt="man" height={100} width={1000} />
                </div>
            </div>
        </div>
    )
}

export default MainTop