import jwt from  "jsonwebtoken"
import {jwtsecret} from "../config"
export class userService{
    static async  registerUser(user:any){
   
        // запрос к БД
        return true 
    }
    static async  loginUser(user:any){
        //тут должен быть запрос к БД
        const token = jwt.sign({
            id:user.id,email:user.email,password:user.password
        },jwtsecret,
        {expiresIn: '24h'})
        return token
    }
    static async  getMeInfo(user:any){
        //тут должен быть запрос к БД
        return true
    }
    static async  updateUser(user:any){
    
        //тут должен быть запрос к БД
        return true // новый JWT 
    }
}
