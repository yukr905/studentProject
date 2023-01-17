import {userService} from "../service/userService"
export class userController{
        static async  register (req:any,res:any){
                const user = await userService.registerUser(req.body)
                return res.status(201).json(user)
        }
        static async  login(req:any,res:any){
                const token = await userService.loginUser(req.body)
                return res.json(token)
        }
        static async  getMe(req:any,res:any){
                const user = await userService.getMeInfo(req.body)
                return res.json(user)
        }
        static async  updateMe(req:any,res:any){
                const newUser = await userService.updateUser(req.body)
                return res.json(newUser)
        }
}