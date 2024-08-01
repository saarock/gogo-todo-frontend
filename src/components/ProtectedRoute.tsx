import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ChildrenProps, RootState } from '../types'

const ProtectedRoute: React.FC<ChildrenProps> = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const isUserAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    )
    useEffect(() => {
        if (!isUserAuthenticated) {
            if (location.pathname !== '/register') {
                navigate('/login')
            }
        } else {
            navigate(location.pathname)
            if (
                location.pathname === '/login' ||
                location.pathname == '/register'
            ) {
                navigate('/dash')
            }
        }
    }, [isUserAuthenticated, navigate])

    return children
}

export default ProtectedRoute
