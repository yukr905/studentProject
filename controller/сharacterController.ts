import {allClass} from "../service/characterService"

export class characterController{
        static async getAllClass(req:any,res:any){
                const clases = await allClass()       
                return res.json(clases)
        }
}


