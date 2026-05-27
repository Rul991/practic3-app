import type { ZodType } from "zod"

export type JsonFetchOptions<T> = {
    schema?: ZodType<T>
    path: string
    postOptions?: {
        body: RequestInit['body'] & {}
    }
}