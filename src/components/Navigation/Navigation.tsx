import { useNavigate, useLocation } from "react-router-dom"
import styles from './Navigation.module.less'
import Button from '../inputs/Button'
import { useState } from "react"

const menuItems = [
    { path: '/info', label: 'Общие сведения' },
    { path: '/certificates', label: 'Мои сертификаты' },
    { path: '/publications', label: 'Публикации' },
    { path: '/education', label: 'Доп. проф. образование' },
]

const Navigation = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isViewAlert, setViewAlert] = useState(false)

    const toggleAlert = () => {
        setViewAlert(prev => !prev)
    }

    const handleNavigation = (path: string) => {
        navigate(path)
    }

    const handleLogout = () => {
        navigate('/login')
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <h2 className={styles.title}>Педагог-портфолио</h2>
            </div>

            {
                isViewAlert && (
                    <div className={styles.alert}>
                        <h2 className={styles.title}>Руководство пользователя</h2>
                        <div className={styles.list}>
                            <div>1. Войти в систему под своей учетной записью</div>
                            <div>2. Вкладка "Общие сведения" - просмотр и редактирование личной информации</div>
                            <div>3. Вкладка "Мои сертификаты" - просмотр и редактирование сертификатов</div>
                            <div>4. Вкладка "Публикации" - просмотр и редактирование публикаций</div>
                            <div>5. Вкладка "Доп. проф. образование" - просмотр и редактирование данных о дополнительном профессиональном образовании</div>
                        </div>
                    </div>
                )
            }

            <div className={styles.menu}>
                {menuItems.map((item) => (
                    <div
                        key={item.path}
                        className={`${styles.buttonWrapper} ${location.pathname === item.path ? styles.activeWrapper : ''}`}
                    >
                        <Button onClick={() => handleNavigation(item.path)}>
                            {item.label}
                        </Button>
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                <div className={styles.buttonWrapper}>
                    <Button onClick={handleLogout}>Выйти</Button>
                </div>

                <div className={`${styles.buttonWrapper} ${styles.blue}`}>
                    <Button onClick={toggleAlert}>Руководство пользователя</Button>
                </div>
            </div>
        </div>
    )
}

export default Navigation