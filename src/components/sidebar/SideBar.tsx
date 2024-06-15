import { useState } from 'react'
import "./slidebar.css"
import { MdDashboardCustomize } from 'react-icons/md'
import { ImMenu } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaCircleChevronRight } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaDochub } from "react-icons/fa6";
const SideBar = () => {
    const [responsive, setResponsive] = useState<boolean>(false);
    const navigate = useNavigate();
    const sideNavs = [

        {
            name: "Profile",
            slug: "/dash",
            active: responsive,
            icon: <CgProfile />,
        },

        {
            name: "Home",
            slug: "/dash/console",
            active: responsive,
            icon: <MdDashboardCustomize />,
        },

        {
            name: "Projects",
            slug: "/dash/projects",
            active: responsive,
            icon: <MdDashboardCustomize />,
        },

        {
            name: "Doc",
            slug: "/doc",
            active: responsive,
            icon: <FaDochub />,
        },

    ]
    return (
        <div className={`gogo__side__navbar ${responsive ? "gogo__side__navbar__responsive" : ""}`}>
            <div className="gogo__side__nav__child">
                {
                    sideNavs.map(sideNav =>
                        sideNav.active ? (
                            <div className="gogo__side__nav" key={sideNav.name} onClick={() => navigate(sideNav.slug)}>
                                <span>{sideNav.icon}</span>
                                {/* <button>{sideNav.name}</button> */}
                            </div>
                        ) : (
                            <div className="gogo__side__nav" key={sideNav.name} onClick={() => navigate(sideNav.slug)}>
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

export default SideBar