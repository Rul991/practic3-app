import { Link, useNavigate } from "react-router-dom"
import styles from './LoginPage.module.less'
import Button from "../../inputs/Button"
import TextInput from "../../inputs/TextInput"
import { useState } from "react"
import type { ZodString } from "zod"
import { loginSchema, passwordSchema } from "../../../schemas/string"
import { LOGIN_LENGTH_MESSAGE, PASSWORD_LENGTH_MESSAGE, WRONG_PASSWORD_MESSAGE } from "../../../consts/messages"
import AuthUtils from "../../../utils/fetch/AuthUtils"

const checkField = (value: string, schema: ZodString) => {
    const result = schema.safeParse(value)
    return result.success
}
const addErrorIfNeed = (errors: string[], checkCallback: () => boolean, message: string) => {
    if (!checkCallback()) {
        errors.push(message)
    }
}

const LoginPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const [errors, setErrors] = useState<string[]>([

    ])

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

    const checkUser = async (): Promise<string[]> => {
        const result = await AuthUtils.login(login, password)

        if (!result) {
            return [
                WRONG_PASSWORD_MESSAGE
            ]
        }

        return []
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

        return errors
    }

    const handleLogin = async () => {
        const errors: string[] = checkFields()

        if (!errors.length) {
            errors.push(...await checkUser())
        }

        if (errors.length) {
            setErrors(errors)
            return
        }
        navigate('/info')
    }

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <h2 className={styles.inputText}>Вход</h2>
                <TextInput
                    title={'Логин'}
                    onChange={setLogin}
                />
                <TextInput
                    title={'Пароль'}
                    type={'password'}
                    onChange={setPassword}
                />

                {
                    errors?.map(error => {
                        return <div className={styles.error}>* {error}</div>
                    })
                }

                <Button onClick={handleLogin}>Войти</Button>
                <Link to={'/register'} className={styles.registerLink}>
                    Нет аккаунта? Создать
                </Link>
            </div>
        </div>
    )
}

export default LoginPage