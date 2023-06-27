import { Router } from "express"
import { registerValidation } from "../middlewares/validate-middleware.js"
import UserController from "../controllers/user-controller.js"
import authMiddleware from "../middlewares/auth-middleware.js"
import adminRoleMiddleware from "../middlewares/isAdminRole-middleware.js"

const userRouter = new Router()

userRouter.post('/registration', registerValidation, UserController.registration)
userRouter.post('/login', registerValidation, UserController.login)
userRouter.post('/logout', UserController.logout)
userRouter.get('/activation/:link', UserController.activation)
userRouter.get('/refresh', UserController.refresh)
userRouter.get('/users', authMiddleware, adminRoleMiddleware, UserController.getUsers)

export default userRouter