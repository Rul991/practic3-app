export default class ExceptionUtils {
    static async handleAsync<T, D = undefined>(callback: () => T, defaultValue: D = undefined as D) {
        try {
            return await callback()
        }
        catch(e) {
            console.error(e)
            return defaultValue
        }
    }

    static handle<T, D = undefined>(callback: () => T, defaultValue: D = undefined as D) {
        try {
            return callback()
        }
        catch(e) {
            console.error(e)
            return defaultValue
        }
    }
}