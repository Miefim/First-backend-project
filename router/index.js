import { Router } from 'express'

import { registerValidation, questionnaireValidation, symptomValidation } from '../middlewares/validate-middleware.js'
import userController from '../controllers/user-controller.js'
import questionnaireController from '../controllers/questionnaire-controller.js'
import symptomController from '../controllers/symptomController.js'
import authMiddleware from '../middlewares/auth-middleware.js'
import adminRoleMiddleware from '../middlewares/isAdminRole-middleware.js'
import consultationController from '../controllers/consultation-controller.js'

const router = new Router()

router.post('/registration', registerValidation, userController.registration)
router.post('/login', registerValidation, userController.login)
router.post('/logout', userController.logout)
router.get('/activation/:link', userController.activation)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, adminRoleMiddleware, userController.getUsers)

router.post('/questionnaire/create', authMiddleware, questionnaireValidation, questionnaireController.createQuestionnaire)
router.get('/questionnaire', authMiddleware, questionnaireController.getQuestionnaire)
router.put('/questionnaire/update', authMiddleware, questionnaireValidation, questionnaireController.updateQuestionnaire)
router.delete('/questionnaire', authMiddleware, questionnaireController.removeQuestionnaire)
router.get('/questionnaires', authMiddleware, adminRoleMiddleware, questionnaireController.getQuestionnaires)

router.post('/symptom/create', authMiddleware, symptomValidation, symptomController.createSymptom)
router.get('/symptom', authMiddleware, symptomController.getSymptom)
router.put('/symptom/update', authMiddleware, symptomValidation, symptomController.updateSymptom)
router.delete('/symptom', authMiddleware, symptomController.removeSymptom)
router.get('/symptoms', authMiddleware, symptomController.getSymptoms)
router.delete('/symptoms', authMiddleware, symptomController.removeSymptoms)

router.post('/consultation/create', authMiddleware, consultationController.createConsultation)
router.get('/consultation', authMiddleware, consultationController.getConsultation)
router.delete('/consultation', authMiddleware, consultationController.removeConsultation)

export default router