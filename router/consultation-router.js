import { Router } from "express"
import { consultationQueryValidation } from "../middlewares/validate-middleware.js"
import ConsultationController from "../controllers/consultation-controller.js"
import authMiddleware from "../middlewares/auth-middleware.js"

const consultationRouter = new Router()

consultationRouter.post('/consultation/create', authMiddleware, ConsultationController.createConsultation)
consultationRouter.get('/consultation', authMiddleware, consultationQueryValidation, ConsultationController.getConsultation)
consultationRouter.delete('/consultation', authMiddleware, consultationQueryValidation, ConsultationController.removeConsultation)

export default consultationRouter