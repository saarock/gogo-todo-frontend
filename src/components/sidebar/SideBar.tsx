import React, { useState } from 'react'
import "./slidebar.css"
import { MdDashboardCustomize } from 'react-icons/md'
import { ImMenu } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaCircleChevronRight } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaDochub } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
const SideBar = () => {
    const [responsive, setResponsive] = useState<boolean>(false);
    const navigate = useNavigate();
    const sideNavs = [

        // {
        //     name: "Profile",
        //     slug: "/dash",
        //     active: responsive,
        //     icon: <CgProfile />,
        // },

        // {
        //     name: "Home",
        //     slug: "/dash/console",
        //     active: responsive,
        //     icon: <MdDashboardCustomize />,
        // },

        {
            name: "Projects",
            slug: "/dash/projects",
            active: responsive,
            icon: <MdDashboardCustomize />,
        },

        // {
        //     name: "Doc",
        //     slug: "/doc",
        //     active: responsive,
        //     icon: <FaDochub />,
        // },

    ]

    const location = useLocation();
   
    return (
        <div className={`gogo__side__navbar ${responsive ? "gogo__side__navbar__responsive" : ""}`}>
            <div className="gogo__top__details__of__user">
                <div className="gogo__user__img">
                    <img src="data:image/jpeg;base64,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" alt="" className='gogo__user__profile__pic' />
                </div>
                {
                    !responsive  &&    <div className="user__details">
                         <h2 className='gogo__username'>
                    AayushBasnet
                </h2>
                <p className='gogo__user__email'>
                    saarock4646@gmail.com
                </p>
                    </div>
                }
          
            </div>
            <div className="gogo__side__nav__child">
                {
                    sideNavs.map(sideNav =>
                        sideNav.active ? (
                            <div className={`gogo__side__nav ${location.pathname === "/dash/projects" ? "gogo__side__nav__active" : ""}`} key={sideNav.name} onClick={() => navigate(sideNav.slug)}>
                                <span>{sideNav.icon}</span>
                                {/* <button>{sideNav.name}</button> */}
                            </div>
                        ) : (
                            <div className={`gogo__side__nav ${location.pathname === "/dash/projects" ? "gogo__side__nav__active" : ""}`} key={sideNav.name} onClick={() => navigate(sideNav.slug)}>
                                <span>{sideNav.icon}</span>
                                <button>{sideNav.name}</button>
                            </div>
                        )

                    )

                }

                <div className="gogo__side__navbar__toggle" onClick={() => setResponsive(!responsive)}>
                    <span>
                        {responsive? (
                            <FaCircleChevronRight/>

                        ): (
                        <FaChevronCircleLeft />

                        )}
                        </span>
                </div>

            </div>
        </div>
    )
}

export default React.memo(SideBar)