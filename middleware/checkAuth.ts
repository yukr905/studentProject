import { NextFunction, Request,Response } from 'express'
import jwt from "jsonwebtoken"
import {jwtsecret} from "../config"
import {ApiError} from "./apiError"


export class auth{
    static async  checkAuth(req:Request,res:Response,next: NextFunction){
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization?.split(" ")[1]
            if (!token) {
                return next(ApiError.unauth("User unauthorizen"))
            }
            const decoded:any = await jwt.verify(token, jwtsecret)
            req.body.id = decoded.id
            next()
        } catch (error) {
            console.log(error)
            return next(ApiError.unauth("User unauthorizen"))
        }
    }
    static async checkWs(io:any, next: any){
        try {
            const tokenIo = io.handshake.headers.authorization
            if (!tokenIo) {
                return next(ApiError.unauth("User unauthorizen"))
            }
            const decodedIo:any = jwt.verify(tokenIo, jwtsecret)
            io.token = tokenIo
            io.user_id = decodedIo.id
            next()
        } catch (error) {
            console.log(error)
            next(ApiError.unauth("User unauthorizen1"))
        }
    }
}