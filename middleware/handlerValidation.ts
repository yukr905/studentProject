import { validationResult } from "express-validator"
import { NextFunction, Request,Response } from 'express';
import {ApiError} from "./apiError"

export function handlerregister (req:Request,res:Response,next: NextFunction){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    if(req.body.password1 !== req.body.password2){
        return next(ApiError.badRequest400("Passwords do not match, please check again "))
    }
    if(req.body.class !== "Warrior" &&  req.body.class !=="Mage" && req.body.class !=="Thief"){
        return next(ApiError.badRequest400("Mage or Warrior or Thief"))
    }
    return next()
}

export function handlerlogin (req:Request,res:Response,next: NextFunction){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    return next()
}
