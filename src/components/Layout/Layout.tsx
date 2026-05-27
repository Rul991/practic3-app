import { Outlet, useNavigate } from "react-router-dom"
import Navigation from "../Navigation/Navigation"
import styles from './Layout.module.less'
import { useEffect } from "react"
import AuthUtils from "../../utils/fetch/AuthUtils"

const Layout = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        (async () => {
            const isAuthenticated = await AuthUtils.isAuthenticated()

            if(!isAuthenticated) {
                navigate('/login')
            }
        })()
    }, [])

    return (
        <div className={styles.layout}>
            <Navigation />
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout