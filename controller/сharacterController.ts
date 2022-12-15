import {allClass} from "../service/characterService"
async function getAllClass(req:any,res:any){
    try {
        const clases = await allClass()       
        return res.json(clases)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong "})
    }
}

export {getAllClass}