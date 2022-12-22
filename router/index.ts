import Router from"express"
import {userController}  from "../controller/userController"
import {characterController} from"../controller/сharacterController"
import {handlerValidation} from "../middleware/handlerValidation"
import {loginValidation,registerValidation} from"../middleware/validation"
import {checkAuth} from "../middleware/checkAuth"



const router = Router()

router.post("/register",registerValidation,handlerValidation.handlerregister , userController.register)
router.post("/login",loginValidation,handlerValidation.handlerlogin, userController.login)
router.get("/me/:id",checkAuth ,userController.getMe)
router.patch("/me:id",checkAuth,handlerValidation.handlerregister, userController.updateMe)
router.get("/class", characterController.getAllClass)



export {router}