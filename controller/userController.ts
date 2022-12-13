
async function register(req:any,res:any){
    try {
        const {name, email, password1, password2 , classCharacter} = req.body
        if(password1 !== password2){
            return res.status(400).json({message:"Passwords do not match, please check again "})
        }
        return res.status(201).json({success:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong "})
    }
}
async function login(req:any,res:any){
    try {
        const {email,password} = req.body
        return res.json({message:"JWT token"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong "})
    }
}
async function getMe(req:any,res:any){
    try {
        const id = req.userId //зашиваем через JWT в разработке
        return res.json({message:"User information"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong "})
    }
}
async function updateMe(req:any,res:any){
    try {
        const id = req.userId //зашиваем через JWT в разработке
        const {name, oldpassword , newpassword1,newpassword2, newClassCharacter} = req.body
        if(newpassword1 !== newpassword2){
            return res.status(400).json({message:"Passwords do not match, please check again "})
        }
        return res.json({message:"new JWT token"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong "})
    }
}

export {register,login,updateMe,getMe}
