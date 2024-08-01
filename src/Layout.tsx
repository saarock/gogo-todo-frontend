import { Footer, GoToTop, Header, Loader } from './components'
import { Outlet } from 'react-router-dom'
import useWhenPageMount from './hooks/useWhenPageMount'
import useTokenValidation from './hooks/useTokenValidation'
import { Toaster } from 'react-hot-toast'
import useFetchProductFromServer from './hooks/useFetchProductFromServer'
import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/modeContext.ts'
import { localStore } from './utils'
import { useSelector } from 'react-redux'

// import useServerSideTokenValidate from './hooks/useServerSideTokenValidate'

const Layout = () => {
    const user = useSelector((state) => state.auth)

    // dark / light mode change;
    const [themeMode, setThemeMode] = useState(localStore.getMode())

    const lightTheme = () => {
        setThemeMode('light')
        localStore.setMode('light')
    }

    const darkTheme = () => {
        setThemeMode('dark')
        localStore.setMode('dark')
    }

    useWhenPageMount()
    const { isLoading } = useTokenValidation()
    useFetchProductFromServer({ page: 0 })

    useEffect(() => {
        const html = document.querySelector('html')!
        html.classList.remove('light', 'dark')
        html.classList.add(themeMode)
    }, [themeMode])

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
                <Header
                    themeMode={themeMode}
                    lightTheme={lightTheme}
                    darkTheme={darkTheme}
                />
                <GoToTop />
                <Toaster position="top-right" />
                <Outlet />
                <Footer />
            </ThemeProvider>
        </>
    )
}

export default Layout
