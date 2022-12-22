import {registerUser , getMeInfo , updateUser , loginUser} from "../service/userService"
import {} from "../middleware/apiError"
export class userController{
        static async  register (req:any,res:any){
                const user = await registerUser(req.body)
                return res.status(201).json(user)
        }
        static async  login(req:any,res:any){
                const token = await loginUser(req.body)
                return res.json(token)
        }
        static async  getMe(req:any,res:any){
                const user = await getMeInfo(req.userId)
                return res.json(user)
        }
        static async  updateMe(req:any,res:any){
                const newUser = await updateUser(req.body)
                return res.json(newUser)
        }
}