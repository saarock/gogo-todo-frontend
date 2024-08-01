import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'
import {
    AboutPage,
    ContactPage,
    DashBoard,
    HomePage,
    LoginPage,
    Product,
    Project,
    RegisterPage,
} from './pages'
import Layout from './Layout'
import { ProtectedRoute } from './components'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index path="" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
                path="/login"
                element={<ProtectedRoute children={<LoginPage />} />}
            />
            <Route
                path="/register"
                element={<ProtectedRoute children={<RegisterPage />} />}
            />
            <Route
                path="/register"
                element={<ProtectedRoute children={<RegisterPage />} />}
            />
            <Route
                path="/dash/projects/"
                element={<ProtectedRoute children={<Project />} />}
            />
            <Route
                path="/dash"
                element={<ProtectedRoute children={<DashBoard />} />}
            />

            <Route
                path="/dash/projects/:productname"
                element={<ProtectedRoute children={<Product />} />}
            />
        </Route>
    )
)

export default router
