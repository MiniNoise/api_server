/**
 * IError
 * @description Error Model
 */
export default interface IError {
    /**
     * Which function failed
     */
    from: string;
    /**
     * Reason for Error
     */
    why: string;
    /**
     * System Error (Native error message)
     */
    systemError?: any;
}

/**
 * createError
 * @description Created an IError
 * @param from where the error occured
 * @param reason why the error was caused
 */
export function createError(from: string, reason: string, systemError?: any): IError {
    return {
        from,
        why: reason,
        systemError
    };
}
