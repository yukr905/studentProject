import jwt from  "jsonwebtoken"
import {jwtsecret} from "../config"

export async function registerUser(user:any){
   
    // запрос к БД
    return true 
}
export async function loginUser(user:any){
    //тут должен быть запрос к БД
    const token = jwt.sign({
        id:user.id,email:user.email,password:user.password
    },jwtsecret,
    {expiresIn: '24h'})
    return token
}
export async function getMeInfo(user:any){
    //тут должен быть запрос к БД
    return true
}
export async function updateUser(user:any){

    //тут должен быть запрос к БД
    return true // новый JWT 
}