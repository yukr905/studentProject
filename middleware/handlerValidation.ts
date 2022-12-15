import { validationResult } from "express-validator"
import { NextFunction } from 'express';

export default (req,res,next: NextFunction)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    return next()
}