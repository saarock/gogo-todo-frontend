import React from 'react'
import './maintop.css' // Import your CSS file

const MainTop = () => {
    return (
        <div className="gogo-main-banner" id="top">
            <div className="gogo-container">
                <div className="gogo-row">
                    <div className="gogo-col-lg-12">
                        <div className="gogo-row">
                            <div className="gogo-col-lg-6 gogo-align-self-center">
                                <div className="gogo-left-content header-text">
                                    <h6>Welcome to Task Master</h6>
                                    <h2>
                                        We Help You <em>Organize</em> <br />{' '}
                                        &amp; <span>Manage</span> Your Tasks
                                    </h2>
                                    <p>
                                        Efficiently manage your tasks and
                                        projects with our comprehensive task
                                        management system.
                                        <br />
                                        Stay organized and achieve your goals
                                        effortlessly. Explore more about our
                                        features{' '}
                                        <a
                                            rel="nofollow"
                                            href="https://example.com"
                                            target="_parent"
                                        >
                                            here
                                        </a>
                                        .
                                    </p>
                                    {/*<form id="search" action="#" method="GET">*/}
                                    {/*  <fieldset>*/}
                                    {/*    <input type="address" name="address" className="gogo-email" placeholder="Search tasks...."*/}
                                    {/*           autoComplete="on" required/>*/}
                                    {/*  </fieldset>*/}
                                    {/*  <fieldset>*/}
                                    {/*    <button type="submit" className="gogo-main-button">Search Tasks</button>*/}
                                    {/*  </fieldset>*/}
                                    {/*</form>*/}
                                </div>
                            </div>
                            <div className="gogo-col-lg-6">
                                <div className="gogo-right-image">
                                    <img
                                        src="/images/banner-right-image.png"
                                        alt="Task management illustration"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainTop
