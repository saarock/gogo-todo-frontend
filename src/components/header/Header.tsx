import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
                <div className="gogo__header__logo">
                    <img
                        src="data:image/jpeg;base64,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"
                        alt=""
                    />
                    <h1 className="gogo__header__logo__text__logo">gogo.com</h1>
                </div>
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
