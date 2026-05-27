import { Navigate } from "react-router-dom"
//import styles from './NotFoundPage.module.less'

type Props = {
    to?: string
}

const NotFoundPage = ({
    to = '/'
}: Props) => {
    return (
        <Navigate replace to={to}></Navigate>
    )
}

export default NotFoundPage