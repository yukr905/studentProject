import {registerUser , getMeInfo , updateUser , loginUser} from "../service/userService"
import {} from "../middleware/apiError"
async function register(req:any,res:any){
        const user = await registerUser(req.body)
        return res.status(201).json(user)
}
async function login(req:any,res:any){
        const token = await loginUser(req.body)
        return res.json(token)
}
async function getMe(req:any,res:any){
        const user = await getMeInfo(req.userId)
        return res.json(user)
}
async function updateMe(req:any,res:any){
        const newUser = await updateUser(req.body)
        return res.json(newUser)
}

export {register,login,updateMe,getMe}
