import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/authSlice'
import { IoLogOut } from "react-icons/io5";
const LogoutBtn = () => {
  const dispatch = useDispatch()
  return (
    <button onClick={() => dispatch(logout())} className='gogo__logout__btn'><IoLogOut />Logout</button>
  )
}

export default LogoutBtn