import {characterService} from "../service/characterService"

export class characterController{
        static async getAllClass(req:any,res:any){
                const clases = await characterService.allClass()       
                return res.json(clases)
        }
}


