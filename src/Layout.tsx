import {Footer, GoToTop, Header, Loader} from './components'
import { Outlet } from 'react-router-dom'
import useWhenPageMount from './hooks/useWhenPageMount'
import useTokenValidation from './hooks/useTokenValidation'
import { Toaster } from 'react-hot-toast'
import useFetchProductFromServer from './hooks/useFetchProductFromServer';



// import useServerSideTokenValidate from './hooks/useServerSideTokenValidate'

const Layout = () => {
  useWhenPageMount();
  const {isLoading} = useTokenValidation()
  useFetchProductFromServer({page: 0});


  if (isLoading) {
      return <Loader/>
  }

  return (
    <>
      <Header />
      <GoToTop/>
      <Toaster position="top-right" />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout