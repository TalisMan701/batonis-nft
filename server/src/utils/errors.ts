import { IErrorToResponse } from "../interfaces/IErrorToResponse";

const JSONStringify = JSON.stringify;


class ServiceError extends Error {
    public status: number;
    public code: string;
    public message: string;
    public data: any;

    constructor(_status: number, _code: string, _message: string, _data: any = null) {
        super();
        this.status = _status;
        this.code = _code;
        this.message = _message;
        this.data = _data;
    }
    
    toResponse() {
        const returnData: IErrorToResponse = {
            success: false,
            error: {
                code: this.code,
                message: this.message,
            },
        };

        if (this.data) {
            returnData.error.data = this.data;
        }

        return returnData;
    }

    toJSON(): string {
        const response = this.toResponse();

        return JSONStringify(response);
    }
}

class BadRequestError extends ServiceError {
    static STATUS = 400;
    static STATUS_TEXT = 'Bad Request';
    static CODE = 'BAD_REQUEST';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(
        _data = null,
        _code = BadRequestError.CODE,
        _message = BadRequestError.STATUS_TEXT,
    ) {
        super(BadRequestError.STATUS, _code, _message, _data);
    }
}

class InvalidParametersError extends BadRequestError {
    static CODE = 'INVALID_PARAMETERS';
    static MESSAGE = 'Invalid Parameters';

    /**
     * @param {Object} _data
     */
    constructor(_data = null) {
        super(_data, InvalidParametersError.CODE, InvalidParametersError.MESSAGE);
    }
}

class UnauthorizedError extends ServiceError {
    static STATUS = 401;
    static STATUS_TEXT = 'Unauthorized';
    static CODE = 'UNAUTHORIZED';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(
        _data = null,
        _code = UnauthorizedError.CODE,
        _message = UnauthorizedError.STATUS_TEXT,
    ) {
        super(UnauthorizedError.STATUS, _code, _message, _data);
    }
}

class ForbiddenError extends ServiceError {
    static STATUS = 403;
    static STATUS_TEXT = 'Forbidden';
    static CODE = 'FORBIDDEN';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = ForbiddenError.CODE, _message = ForbiddenError.STATUS_TEXT) {
        super(ForbiddenError.STATUS, _code, _message, _data);
    }
}

class NotFoundError extends ServiceError {
    static STATUS = 404;
    static STATUS_TEXT = 'Not Found';
    static CODE = 'NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = NotFoundError.CODE, _message = NotFoundError.STATUS_TEXT) {
        super(NotFoundError.STATUS, _code, _message, _data);
    }
}

class InternalServerError extends ServiceError {
    static STATUS = 500;
    static STATUS_TEXT = 'Internal Server Error';
    static CODE = 'INTERNAL_SERVER_ERROR';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(
        _data = null,
        _code = InternalServerError.CODE,
        _message = InternalServerError.STATUS_TEXT,
    ) {
        super(InternalServerError.STATUS, _code, _message, _data);
    }
}



class InvalidShemaError extends BadRequestError {
    static CODE = 'INVALID_SHEMA';
    static MESSAGE = 'Invalid Shema';

    constructor() {
        super(null, InvalidShemaError.CODE, InvalidShemaError.MESSAGE);
    }
}



export {
    ServiceError,
    BadRequestError,
    InvalidParametersError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    InternalServerError,
    InvalidShemaError,
};
