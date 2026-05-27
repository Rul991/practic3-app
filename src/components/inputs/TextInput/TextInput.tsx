import { useState, type HTMLInputTypeAttribute } from 'react'
import styles from './TextInput.module.less'

type Props = {
    title: string
    onChange?: (value: string) => void
    type?: HTMLInputTypeAttribute
    value?: string
    maxLength?: number
}

const TextInput = ({
    title,
    onChange = () => { },
    type = 'text',
    value: startValue = '',
    maxLength = -1
}: Props) => {
    const [value, setValue] = useState(startValue)

    return (
        <div className={styles.container}>
            <div>{title}:</div>
            <input
                type={type}
                onChange={e => setValue(e.target.value)}
                onBlur={() => onChange(value)}
                maxLength={maxLength}
            />
        </div>
    )
}

export default TextInput