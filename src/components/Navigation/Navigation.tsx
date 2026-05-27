// src/components/Navigation/Navigation.tsx
import { useNavigate, useLocation } from "react-router-dom"
import styles from './Navigation.module.less'
import Button from '../inputs/Button'

const Navigation = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        { path: '/info', label: 'Общие сведения' },
       // { path: '/results', label: 'Результаты за 3 года' },
        { path: '/certificates', label: 'Мои сертификаты' },
        { path: '/publications', label: 'Публикации' },
     //   { path: '/pedagogical', label: 'Педагогическая деятельность' },
     //   { path: '/extracurricular', label: 'Внеурочная деятельность' },
       // { path: '/methodical', label: 'Методическая деятельность' },
      //  { path: '/resources', label: 'Материальная база' },
        { path: '/education', label: 'Доп. проф. образование' },
      //  { path: '/documents', label: 'Копии документов' }
    ]

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
            </div>
        </div>
    )
}

export default Navigation