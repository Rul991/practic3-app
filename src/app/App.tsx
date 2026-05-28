import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../components/Layout"

const LoginPage = lazy(() => import('../components/pages/LoginPage'))
const RegisterPage = lazy(() => import('../components/pages/RegisterPage'))
const NotFoundPage = lazy(() => import('../components/pages/NotFoundPage'))

const InfoPage = lazy(() => import('../components/pages/InfoPage'))
const CertificatesPage = lazy(() => import('../components/pages/CertificatesPage/CertificatesPage'))
const PublicationsPage = lazy(() => import('../components/pages/PublicationsPage/PublicationsPage'))
const EducationPage = lazy(() => import('../components/pages/EducationPage'))

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/" element={<Layout />}>
                    <Route path="info" element={<InfoPage />} />
                    <Route path="certificates" element={<CertificatesPage />} />
                    <Route path="publications" element={<PublicationsPage />} />
                    <Route path="education" element={<EducationPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App