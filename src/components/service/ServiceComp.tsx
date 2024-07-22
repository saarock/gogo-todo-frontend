import React from 'react';
import "./service.css";

const ServiceComp = () => {
  return (
    <div id="services" className="gogo__our-services gogo__section">
      <div className="gogo__container">
        <div className="gogo__row">
          <div className="gogo__col-lg-6 gogo__align-self-center gogo__wow gogo__fadeInLeft">
            <div className="gogo__left-image">
              <img src="/images/services-left-image.png" alt="Services" />
            </div>
          </div>
          <div className="gogo__col-lg-6 gogo__wow gogo__fadeInRight">
            <div className="gogo__section-heading">
              <h2>Grow your website with our <em>SEO</em> service &amp; <span>Project</span> Ideas</h2>
              <p>Space Dynamic HTML5 template is free to use for your website projects. However, you are not permitted to redistribute the template ZIP file on any CSS template collection websites. Please contact us for more information. Thank you for your kind cooperation.</p>
            </div>
            <div className="gogo__row__service">
              <div className="gogo__col-lg-12">
                <div className="gogo__progress-skill-bar gogo__first-bar">
                  <h4>Website Analysis</h4>
                  <span>84%</span>
                  <div className="gogo__full-bar">
                    <div className="gogo__filled-bar gogo__first-bar-filled"></div>
                  </div>
                </div>
              </div>
              <div className="gogo__col-lg-12">
                <div className="gogo__progress-skill-bar gogo__second-bar">
                  <h4>SEO Reports</h4>
                  <span>88%</span>
                  <div className="gogo__full-bar">
                    <div className="gogo__filled-bar gogo__second-bar-filled"></div>
                  </div>
                </div>
              </div>
              <div className="gogo__col-lg-12">
                <div className="gogo__progress-skill-bar gogo__third-bar">
                  <h4>Page Optimizations</h4>
                  <span>94%</span>
                  <div className="gogo__full-bar">
                    <div className="gogo__filled-bar gogo__third-bar-filled"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceComp;
