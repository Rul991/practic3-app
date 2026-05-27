import styles from '../LoginPage/LoginPage.module.less'
import { Link, useNavigate } from "react-router-dom"
import Button from "../../inputs/Button"
import TextInput from "../../inputs/TextInput"
import { useState } from 'react'
import type { ZodString } from 'zod'
import { loginSchema, passwordSchema } from '../../../schemas/string'
import { LOGIN_LENGTH_MESSAGE, NOT_EQUAL_PASSWORDS_MESSAGE, PASSWORD_LENGTH_MESSAGE, USER_EXIST_MESSAGE } from '../../../consts/messages'
import AuthUtils from '../../../utils/fetch/AuthUtils'

type Props = {}

const checkField = (value: string, schema: ZodString) => {
    const result = schema.safeParse(value)
    return result.success
}
const addErrorIfNeed = (errors: string[], checkCallback: () => boolean, message: string) => {
    if (!checkCallback()) {
        errors.push(message)
    }
}

const RegisterPage = ({ }: Props) => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState<string[]>([])

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')

    const checkLogin = () => {
        return checkField(
            login,
            loginSchema
        )
    }

    const checkPassword = () => {
        return checkField(
            password,
            passwordSchema
        )
    }

    const checkFields = () => {
        const errors: string[] = []

        addErrorIfNeed(
            errors,
            checkLogin,
            LOGIN_LENGTH_MESSAGE
        )

        addErrorIfNeed(
            errors,
            checkPassword,
            PASSWORD_LENGTH_MESSAGE
        )

        addErrorIfNeed(
            errors,
            () => password === secondPassword,
            NOT_EQUAL_PASSWORDS_MESSAGE
        )

        return errors
    }

    const register = async () => {
        return await AuthUtils.register(
            login,
            password
        )
    }

    const onButtonClick = async () => {
        const errors: string[] = checkFields()

        if (errors.length) {
            setErrors(errors)
            return
        }

        if (!await register()) {
            setErrors([
                USER_EXIST_MESSAGE
            ])
            return
        }

        navigate('/info')
    }

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <h2 className={styles.inputText}>Регистрация</h2>
                <TextInput
                    title={'Логин'}
                    onChange={setLogin}
                />
                <TextInput
                    title={'Пароль'}
                    type={'password'}
                    onChange={setPassword}
                />
                <TextInput
                    title={'Подтверждение пароля'}
                    type={'password'}
                    onChange={setSecondPassword}
                />
                {
                    errors?.map(error => {
                        return <div className={styles.error}>* {error}</div>
                    })
                }
                <Button onClick={onButtonClick}>Зарегистрироваться</Button>
                <Link to={'/login'} className={styles.registerLink}>
                    Есть аккаунт? Войти
                </Link>
            </div>
        </div>
    )
}

export default RegisterPage