import express, { NextFunction, Request, Response } from 'express';
import { IErrorToResponse } from '../interfaces/IErrorToResponse';
import { InternalServerError, ServiceError } from '../utils/errors';

// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (_err: ServiceError, req: Request, res: Response , next: NextFunction) => {

    let err = _err;
    if (!(err instanceof ServiceError)) {
        err = new InternalServerError();
    }

    let body: IErrorToResponse | string = err.toResponse();

    if (err.status === 200) {
        body = err.message;
    }

    res.status(err.status).json(body);
};
