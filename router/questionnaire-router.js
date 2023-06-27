import { Router } from "express"
import { questionnaireValidation } from "../middlewares/validate-middleware.js"
import QuestionnaireController from "../controllers/questionnaire-controller.js"
import authMiddleware from "../middlewares/auth-middleware.js"
import adminRoleMiddleware from "../middlewares/isAdminRole-middleware.js"

const questionnaireRouter = new Router()

questionnaireRouter.post('/questionnaire/create', authMiddleware, questionnaireValidation, QuestionnaireController.createQuestionnaire)
questionnaireRouter.get('/questionnaire', authMiddleware, QuestionnaireController.getQuestionnaire)
questionnaireRouter.put('/questionnaire/update', authMiddleware, questionnaireValidation, QuestionnaireController.updateQuestionnaire)
questionnaireRouter.delete('/questionnaire', authMiddleware, QuestionnaireController.removeQuestionnaire)
questionnaireRouter.get('/questionnaires', authMiddleware, adminRoleMiddleware, QuestionnaireController.getQuestionnaires)

export default questionnaireRouter