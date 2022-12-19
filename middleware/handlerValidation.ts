// import { validationResult } from "express-validator"
// import { NextFunction } from 'express';

// export default (req,res,next: NextFunction)=>{
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json(errors.array())
//     }
//     if(req.body.password1 !== req.body.password2){
//         return res.status(400).json({message:"Passwords do not match, please check again "})
//     }
//     if(req.body.class !== "Warrior" &&  req.body.class !=="Mage" && req.body.class !=="Thief"){
//         return res.status(400).json({message:"Mage or Warrior or Thief"})
//     }
//     return next()
// }