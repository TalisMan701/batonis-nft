export interface IErrorToResponse {
    success: boolean,
    error: {
        code: string,
        message: string,
        data?: any
    }
}