import styles from './Button.module.less'
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren & {
    onClick?: () => void
}

const Button = ({
    onClick = () => {},
    children
}: Props) => {
    return (
        <button onClick={onClick} className={styles.button}>
            {children}
        </button>
    )
}

export default Button