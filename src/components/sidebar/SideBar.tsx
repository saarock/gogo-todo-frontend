import { useState } from 'react'
import "./slidebar.css"
import { MdDashboardCustomize } from 'react-icons/md'
import { ImMenu } from "react-icons/im";

const SideBar = () => {
    const [responsive, setResponsive] = useState<boolean>(false);
    const sideNavs = [

        {
            name: "Profile",
            slug: "#settings",
            active: responsive,
            icon: <MdDashboardCustomize />,
        },

        {
            name: "Home",
            slug: "#settings",
            active: responsive,
            icon: <MdDashboardCustomize />,
        },

        {
            name: "Projects",
            slug: "#settings",
            active: responsive,
            icon: <MdDashboardCustomize />,
        },

        {
            name: "Doc",
            slug: "#settings",
            active: responsive,
            icon: <MdDashboardCustomize />,
        },

    ]
    return (
        <div className={`gogo__side__navbar ${responsive ? "gogo__side__navbar__responsive" : ""}`}>
            <div className="gogo__side__nav__child">
                {
                    sideNavs.map(sideNav =>
                        sideNav.active ? (
                            <div className="gogo__side__nav" key={sideNav.name}>
                                <span>{sideNav.icon}</span>
                                {/* <button>{sideNav.name}</button> */}
                            </div>
                        ) : (
                            <div className="gogo__side__nav" key={sideNav.name}>
                                <span>{sideNav.icon}</span>
                                <button>{sideNav.name}</button>
                            </div>
                        )

                    )

                }

                <div className="gogo__side__navbar__toggle" onClick={() => setResponsive(!responsive)}>
                    <span><ImMenu /></span>
                </div>

            </div>
        </div>
    )
}

export default SideBar