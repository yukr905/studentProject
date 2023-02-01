import { validationResult } from "express-validator"
import { NextFunction, Request,Response } from 'express';
import {ApiError} from "./apiError"



export class handlerValidation{
    static handlerregister (req:Request,res:Response,next: NextFunction){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }
        if(req.body.class_id !== 1 &&  req.body.class_id !==2 && req.body.class_id!==3){
            return next(ApiError.badRequest400("1 2 3"))
        }
        return next()
    }
    static handlerlogin (req:Request,res:Response,next: NextFunction){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }
        return next()
    }
}

