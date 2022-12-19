import Router from"express"

import {login,register,getMe,updateMe}  from "../controller/userController"
import {getAllClass} from"../controller/сharacterController"
import {handlerregister, handlerlogin} from "../middleware/handlerValidation"
import {loginValidation,registerValidation} from"../middleware/validation"

const router = Router()

router.post("/register",registerValidation,handlerregister , register)
router.post("/login",loginValidation,handlerlogin, login)
router.get("/me/:id", getMe)
router.patch("/me:id",registerValidation, updateMe)
router.get("/class", getAllClass)

export {router}