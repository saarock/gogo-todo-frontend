import React from 'react'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import useWhenPageMount from './hooks/useWhenPageMount'
import useTokenValidation from './hooks/useTokenValidation'
// import useServerSideTokenValidate from './hooks/useServerSideTokenValidate'

const Layout = () => {
  useTokenValidation()

  useWhenPageMount()
  // useTokenValidation()
  // useServerSideTokenValidate()
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout