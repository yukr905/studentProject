async function getAllClass(req:any,res:any){
    try {       
        return res.json({message:"Список классов"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong "})
    }
}


export {getAllClass}