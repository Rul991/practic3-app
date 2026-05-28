import { isAuthenticateSchema } from "../../schemas/auth"
import FetchUtils from "../fetch/FetchUtils"

export default class AuthUtils {
    static async login(login: string, password: string): Promise<boolean> {
        return await FetchUtils.json({
            path: '/api/login',
            schema: isAuthenticateSchema,
            postOptions: {
                body: JSON.stringify({
                    login,
                    password
                })
            }
        }) ?? true
    }

    static async isAuthenticated(): Promise<boolean> {
        return await FetchUtils.json({
            path: '/api/is_auth',
            schema: isAuthenticateSchema
        }) ?? true
    }

    static async register(login: string, password: string): Promise<boolean> {
        return await FetchUtils.json({
            path: '/api/register',
            schema: isAuthenticateSchema,
            postOptions: {
                body: JSON.stringify({
                    login,
                    password
                })
            }
        }) ?? false
    }
}