import ExceptionUtils from "../exception/ExceptionUtils"
import type { JsonFetchOptions } from "../../types/options"
import { any } from "zod"

export default class FetchUtils {
    private static readonly _startPath = import.meta.env.PROD ? '' : '/dev'

    static async fetch(path: string, init?: RequestInit) {
        return await ExceptionUtils.handleAsync(
            () => {
                const fullPath = `${this._startPath}${path}`
                return fetch(
                    fullPath,
                    init
                )
            }
        )
    }

    static async json<T = any>({
        path,
        schema = any(),
        postOptions
    }: JsonFetchOptions<T>): Promise<T | undefined> {
        return await ExceptionUtils.handleAsync(
            async () => {
                const response = await this.fetch(
                    path,
                    postOptions ?
                        {
                            body: postOptions.body,
                            method: 'POST',
                        } : 
                        undefined
                )
                if (!response) return undefined

                const data = await response.json()
                const parsed = schema.safeParse(
                    data
                )

                return parsed.data
            }
        )
    }
}