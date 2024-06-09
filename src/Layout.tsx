import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import useWhenPageMount from './hooks/useWhenPageMount'
import useTokenValidation from './hooks/useTokenValidation'
import { Toaster } from 'react-hot-toast'


// import useServerSideTokenValidate from './hooks/useServerSideTokenValidate'

const Layout = () => {
  useWhenPageMount()
  useTokenValidation()

  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout