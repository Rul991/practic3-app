import { string } from "zod"
import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from "../consts/length"

export const loginSchema = string().min(MIN_LOGIN_LENGTH).max(MAX_LOGIN_LENGTH)
export const passwordSchema = string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH)