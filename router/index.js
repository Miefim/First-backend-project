import { Router } from 'express'
import { body } from 'express-validator'
import userController from '../controllers/user-controller.js'
import authMiddleware from '../middlewares/auth-middleware.js'
import { registerValidation } from '../middlewares/validate-middleware.js'

const router = new Router()

router.post('/registration', registerValidation, userController.registration)
router.post('/login', registerValidation, userController.login)
router.post('/logout', userController.logout)
router.get('/activation/:link', userController.activation)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

export default router