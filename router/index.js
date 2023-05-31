import { Router } from 'express'

import { registerValidation, questionnaireValidation } from '../middlewares/validate-middleware.js'
import userController from '../controllers/user-controller.js'
import questionnaireController from '../controllers/questionnaire-controller.js'
import authMiddleware from '../middlewares/auth-middleware.js'
import adminRoleMiddleware from '../middlewares/isAdminRole-middleware.js'

const router = new Router()

router.post('/registration', registerValidation, userController.registration)
router.post('/login', registerValidation, userController.login)
router.post('/logout', userController.logout)
router.get('/activation/:link', userController.activation)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, adminRoleMiddleware, userController.getUsers)

router.post('/create_questionnaire', authMiddleware, questionnaireValidation, questionnaireController.createQuestionnaire)
router.put('/update_questionnaire', authMiddleware, questionnaireValidation, questionnaireController.updateQuestionnaire)

export default router