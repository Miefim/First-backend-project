import { Router } from "express"
import { symptomBodyValidation, symptomQueryValidation } from "../middlewares/validate-middleware.js"
import SymptomController from "../controllers/symptom-controller.js"
import authMiddleware from "../middlewares/auth-middleware.js"

const symptomRouter = new Router()

symptomRouter.post('/symptom/create', authMiddleware, symptomBodyValidation, SymptomController.createSymptom)
symptomRouter.get('/symptom', authMiddleware, symptomQueryValidation, SymptomController.getSymptom)
symptomRouter.put('/symptom/update', authMiddleware, symptomBodyValidation, SymptomController.updateSymptom)
symptomRouter.delete('/symptom', authMiddleware, symptomQueryValidation, SymptomController.removeSymptom)

export default symptomRouter