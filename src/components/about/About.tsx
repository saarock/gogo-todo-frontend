import React from 'react'
import './about.css'
import TextScroll from '../textscroll/TextScroll'

const About = () => {
    return (
        <div id="gogo__about" className="gogo__about-us gogo__section">
            <div className="gogo__container">
                <div className="gogo__row">
                    <div className="gogo__col-lg-4">
                        <div className="gogo__left-image">
                            <img
                                src="/images/about-left-image.png"
                                alt="person graphic"
                            />
                        </div>
                    </div>
                    <div className="gogo__col-lg-8 align-self-center">
                        <div className="gogo__services">
                            <div className="gogo__row_for__about">
                                <div className="gogo__col-lg-6">
                                    <div className="gogo__item wow">
                                        <div className="gogo__icon">
                                            <img
                                                src="/images/service-icon-01.png"
                                                alt="Data Analysis"
                                            />
                                        </div>
                                        <div className="gogo__right-text">
                                            <h4>Data Analysis</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet,
                                                ctetur aoi adipiscing eliter
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="gogo__col-lg-6">
                                    <div className="gogo__item wow">
                                        <div className="gogo__icon">
                                            <img
                                                src="/images/service-icon-02.png"
                                                alt="Data Reporting"
                                            />
                                        </div>
                                        <div className="gogo__right-text">
                                            <h4>Data Reporting</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet,
                                                ctetur aoi adipiscing eliter
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="gogo__col-lg-6">
                                    <div className="gogo__item wow">
                                        <div className="gogo__icon">
                                            <img
                                                src="/images/service-icon-03.png"
                                                alt="Web Analytics"
                                            />
                                        </div>
                                        <div className="gogo__right-text">
                                            <h4>Web Analytics</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet,
                                                ctetur aoi adipiscing eliter
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="gogo__col-lg-6">
                                    <div className="gogo__item wow">
                                        <div className="gogo__icon">
                                            <img
                                                src="/images/service-icon-04.png"
                                                alt="SEO Suggestions"
                                            />
                                        </div>
                                        <div className="gogo__right-text">
                                            <h4>SEO Suggestions</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet,
                                                ctetur aoi adipiscing eliter
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
