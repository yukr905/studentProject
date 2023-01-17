import jwt from  "jsonwebtoken"
import {jwtsecret} from "../config"
import {Classes, Users} from "../models/models"
import  bcrypt from "bcrypt"
import {ApiError} from "../middleware/apiError"


export class userService{
    static async  registerUser(user:any){
        try {
        const {email,password,username,class_id} = user
        await Users.findOne({where:{email:email,username:username}})
        const hashPassword = await bcrypt.hash(password,8)
        user.password = hashPassword
        await Users.create(user)
        return true 
    } catch (error) {
        return ApiError.badRequest400("Такой пользователь уже зарегистрирован")
    }
    }
    static async  loginUser(user:any){
        const {email,password} = user
        const candidate = await Users.findOne({where:{email:email}})
        if(!candidate){
            return ApiError.badRequest400("Пользователь не зарегистрирован")
        }
        const compare = await bcrypt.compare(password,candidate.password)
        if(!compare){
            return ApiError.badRequest400("Неверный логин или пароль")

        }
        const token = jwt.sign({
            id:candidate.id,email:candidate.email,password:candidate.password
        },jwtsecret,
        {expiresIn: '24h'})
        return token
    }
    static async  getMeInfo(user:any){

        const candidate:any = await Users.findAll(
          {attributes:["email","username"],where: {id:user.id},
            include: [
              {
                model: Classes,
                as: 'classes',
                required: true,
                attributes:["id","name","health","damage","attack_type","ability"]
              }
          ]})
        if(!candidate){
            return ApiError.internal("Что-то пошло не так")
        }
        return candidate
    }
    static async  updateUser(user:any){
        const {email,password,username} = user
        const candidate = await Users.findOne({where:{email:email,username:username}})
        if(candidate){
            return ApiError.badRequest400("Такой пользователь уже зарегистрирован")
        }
        const hashPassword = await bcrypt.hash(password,8)
        user.password = hashPassword
        await Users.update({email:user.email,password:user.password,username:user.username,class_id:user.class_id},{where:{id:user.id}})
        const token = jwt.sign({
            id:user.id,email:user.email,password:user.password
        },jwtsecret,
        {expiresIn: '24h'})
        return token
    }
}
