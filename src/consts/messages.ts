import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from "./length"

export const LOGIN_LENGTH_MESSAGE = `Длина логина должна быть от ${MIN_LOGIN_LENGTH} до ${MAX_LOGIN_LENGTH}`
export const PASSWORD_LENGTH_MESSAGE = `Длина пароля должна быть от ${MIN_PASSWORD_LENGTH} до ${MAX_PASSWORD_LENGTH}`
export const NOT_EQUAL_PASSWORDS_MESSAGE = 'Пароли не совпадают'
export const WRONG_PASSWORD_MESSAGE = 'Неверный логин или пароль'
export const USER_EXIST_MESSAGE = 'Такой логин уже есть'