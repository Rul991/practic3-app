//import styles from './IndexPage.module.less'

import { Link } from "react-router-dom"

type Props = {
    
}

const IndexPage = ({}: Props) => {
    return (
        <div>
            <Link to={'/login'}>Войти</Link>
            <br />
            <Link to={'/register'}>Зарегистрироваться</Link>
        </div>
    )
}

export default IndexPage