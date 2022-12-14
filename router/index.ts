import Router from"express"
import {login,register,getMe,updateMe}  from "../controller/userController"
import {getAllClass} from"../controller/сharacterController"
const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me/:id", getMe)
router.patch("/me:id", updateMe)
router.get("/class", getAllClass)

export {router}