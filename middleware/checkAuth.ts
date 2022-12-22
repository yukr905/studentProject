import { NextFunction, Request,Response } from 'express'
import jwt from "jsonwebtoken"
import {jwtsecret} from "../config"
import {ApiError} from "./apiError"

export async function checkAuth(req:Request,res:Response,next: NextFunction){
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return next(ApiError.unauth("User unauthorizen"))
    }
    const decoded = await jwt.verify(token, jwtsecret)
    req.body.token = decoded
    next()
    } catch (error) {
        console.log(error)
        return next(ApiError.unauth("User unauthorizen"))
    }
}