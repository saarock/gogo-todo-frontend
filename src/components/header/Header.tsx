import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'
import LogoutBtn from './LogoutBtn'
import { HeaderProps, RootState } from '../../types'
import { IoHome } from 'react-icons/io5'
import {
    MdContactPhone,
    MdFollowTheSigns,
    MdDashboardCustomize,
} from 'react-icons/md'
import { FcAbout } from 'react-icons/fc'
import { IoSettings } from 'react-icons/io5'
import { MdOutlineAddHomeWork } from 'react-icons/md'
import React, { useRef } from 'react'
import useTheme from '../../context/modeContext.ts'
import { TiThMenu } from 'react-icons/ti'
const Header: React.FC<HeaderProps> = ({
    darkTheme,
    lightTheme,
    themeMode,
}) => {
    const authStates = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    )
    const nav = useRef<HTMLNavElement>()
    const theme = useTheme()
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true,
            icon: <IoHome />,
        },
        {
            name: 'Contact',
            slug: '/contact',
            active: true,
            icon: <MdContactPhone />,
        },

        {
            name: 'About',
            slug: '/about',
            active: true,
            icon: <FcAbout />,
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStates,
            icon: <MdFollowTheSigns />,
        },
        {
            name: 'Register',
            slug: '/register',
            active: !authStates,
            icon: <MdFollowTheSigns />,
        },
        {
            name: 'Work Station',
            slug: '/dash/',
            active: authStates,
            icon: <MdOutlineAddHomeWork />,
        },
        {
            name: 'settings',
            slug: '#settings',
            active: true,
            icon: <IoSettings />,
            children: [
                {
                    name: `${themeMode === 'dark' ? 'light' : 'dark'} Mode`,
                    slug: '/settings/child1',
                    active: authStates,
                    icon: <MdDashboardCustomize />,
                },
            ],
        },
    ]

    const handleNavigate = (slug: string) => {
        navigate(slug)
    }

    const hideShowNav = () => {
        nav.current.classList.toggle('showNav')
    }

    return (
        <header className={`gogo__header ${theme.themeMode}`}>
            <nav className="gogo__header__nav" ref={nav}>
                <span className={`gogo__nav__menu`} onClick={hideShowNav}>
                    {<TiThMenu />}
                </span>
                <Link to={'/'}>
                    <div className="gogo__header__logo">
                        <img src="./images/gogo_logo.jpeg" alt="" />
                        <h1 className="gogo__header__logo__text__logo">
                            gogo.com
                        </h1>
                    </div>
                </Link>
                <ul className="gogo__header__nav__navs">
                    {navItems.map((nav) =>
                        nav.active ? (
                            <li
                                key={nav.name}
                                onClick={() => handleNavigate(nav.slug)}
                                className={`gogo__header__nav__navs__navbar ${nav.name.toLowerCase()}__nav ${
                                    nav.children && 'gogo__settings'
                                }`}
                            >
                                <span>{nav.icon}</span>

                                {nav.name}

                                {/* child navs */}
                                {nav.children && (
                                    <ul
                                        className="gogo__header__nav__child__navs"
                                        key={nav.name}
                                    >
                                        <span className="gogo__tag">BETA</span>
                                        {nav.children.map((childNav) => (
                                            <li
                                                className="gogo__header__nav__navs__child__navbar"
                                                key={childNav.name}
                                                onClick={
                                                    childNav.name ===
                                                    'dark Mode'
                                                        ? darkTheme
                                                        : childNav.name ===
                                                            'light Mode'
                                                          ? lightTheme
                                                          : undefined
                                                }
                                            >
                                                <span>{nav.icon}</span>
                                                {childNav.name}
                                            </li>
                                        ))}
                                        {authStates ? <LogoutBtn /> : ''}
                                    </ul>
                                )}
                            </li>
                        ) : null
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header
