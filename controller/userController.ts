import {registerUser , getMeInfo , updateUser , loginUser} from "../service/userService"
import { validationResult } from "express-validator"
async function register(req:any,res:any){
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }  
        const user = await registerUser(req.body)
        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong "})
    }
}
async function login(req:any,res:any){
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }
        const token = await loginUser(req.body)
        return res.json(token)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong "})
    }
}
async function getMe(req:any,res:any){
    try {
        const user = await getMeInfo(req.userId)
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong "})
    }
}
async function updateMe(req:any,res:any){
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }
        const newUser = await updateUser(req.body)
        return res.json(newUser)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong "})
    }
}

export {register,login,updateMe,getMe}
