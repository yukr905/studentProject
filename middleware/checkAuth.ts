import { NextFunction, Request,Response } from 'express'
import jwt from "jsonwebtoken"
import {jwtsecret} from "../config"
import {ApiError} from "./apiError"
import {checker} from "../middleware/handlerEvent"
import { Socket } from 'socket.io'

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
            const decoded = await jwt.verify(token, jwtsecret)
            req.body.token = decoded
            next()
        } catch (error) {
            console.log(error)
            return next(ApiError.unauth("User unauthorizen"))
        }
    }
    static async checkWs(io:any, next: NextFunction){
        try {

            const tokenIo = io.handshake.headers.authorization
            if (!tokenIo) {
                return next(ApiError.unauth("User unauthorizen"))
            }
            const decodedIo = jwt.verify(tokenIo, jwtsecret)
            next()
        } catch (error) {
            console.log(error)
            next(ApiError.unauth("User unauthorizen1"))
        }
    }
}
