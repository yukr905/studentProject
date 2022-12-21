import {ApiError} from "./apiError"
import { NextFunction, Request,Response } from 'express'

export function handlerError (err: Error,req:Request,res:Response,next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    if (res.headersSent) {
        return next(err);
    }

    return res.status(500).json({message: "Непредвиденная ошибка!"})
}