import { NextFunction, Request,Response } from 'express'
import jwt from "jsonwebtoken"
import {jwtsecret} from "../config"

export async function checkAuth(req:Request,res:Response,next: NextFunction){
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = await jwt.verify(token, jwtsecret)
        req.body.token = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
}