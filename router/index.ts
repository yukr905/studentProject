import Router from"express"

import {login,register,getMe,updateMe}  from "../controller/userController"
import {getAllClass} from"../controller/сharacterController"
import { validationResult } from "express-validator"
import {loginValidation,registerValidation} from"../middleware/validation"

const router = Router()


router.post("/register",registerValidation, validationResult, register)
router.post("/login",loginValidation, validationResult, login)
router.get("/me/:id", getMe)
router.patch("/me:id",registerValidation, validationResult, updateMe)
router.get("/class", getAllClass)

export {router}