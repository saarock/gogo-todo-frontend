import React from 'react';
import './maintop.css'; // Import your CSS file

const MainTop = () => {
  return (
    <div className="gogo-main-banner" id="top">
      <div className="gogo-container">
        <div className="gogo-row">
          <div className="gogo-col-lg-12">
            <div className="gogo-row">
              <div className="gogo-col-lg-6 gogo-align-self-center">
                <div className="gogo-left-content header-text wow fadeInLeft">
                  <h6>Welcome to Space Dynamic</h6>
                  <h2>We Make <em>Project Ideas</em> <br /> &amp; <span>Lorem</span> Kanban</h2>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda laudantium veritatis soluta sint vta 2. 
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, labore! <a rel="nofollow" href="https://templatemo.com/page/1" target="_parent">GOGO</a>.</p>
                  <form id="search" action="#" method="GET">
                    <fieldset>
                      <input type="address" name="address" className="gogo-email" placeholder="Search project...." autoComplete="on" required />
                    </fieldset>
                    <fieldset>
                      <button type="submit" className="gogo-main-button">Search PRrject</button>
                    </fieldset>
                  </form>
                </div>
              </div>
              <div className="gogo-col-lg-6">
                <div className="gogo-right-image wow fadeInRight">
                  <img src="/images/banner-right-image.png" alt="team meeting" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTop;
