import {allClass} from "../service/characterService"
async function getAllClass(req:any,res:any){
        const clases = await allClass()       
        return res.json(clases)
}

export {getAllClass}