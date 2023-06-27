import { validationResult } from "express-validator"
import ApiError from "../exceptions/api-error.js"
import SymptomService from "../service/symptom-service.js"

class SymptomController {

   async createSymptom(req, res, next) {
      try { 
         const error = validationResult(req)
         
         if(!error.isEmpty()) {
            throw ApiError.BadRequest('Ошибка валидации', error.errors)
         }

         const userId = req.user.id
         const symptom = req.body
         const symptomData = await SymptomService.createSymptom(userId, symptom)

         return res.json(symptomData)
      } catch (error) {

         next(error) 
      }
   }

   async getSymptom(req, res, next) {   
      try {
         const error = validationResult(req)
         
         if(!error.isEmpty()) {
            throw ApiError.BadRequest('Ошибка валидации', error.errors)
         }

         const userId = req.user.id
         const query = req.query
         const symptom = await SymptomService.getSymptom(userId, query)   

         return res.json(symptom)
      } catch (error) {

         next(error)   
      }
   }

   async updateSymptom(req, res, next) {
      try {
         const error = validationResult(req)
         
         if(!error.isEmpty()) {
            throw ApiError.BadRequest('Ошибка валидации', error.errors)
         }

         const userId = req.user.id
         const _id = req.query._id
         const newSymptom = req.body

         if(!_id) {
            throw ApiError.BadRequest('Укажите id симптома')
         }
         
         const updatedData = await SymptomService.updateSymptom(userId, _id, newSymptom)
         return res.json(updatedData)
      } catch (error) {

         next(error)  
      }
   }

   async removeSymptom(req, res, next) {    
      try {
         const error = validationResult(req)
         
         if(!error.isEmpty()) {
            throw ApiError.BadRequest('Ошибка валидации', error.errors)
         }
                
         const userId = req.user.id
         const query = req.query
         const removedData = await SymptomService.removeSymptom(userId, query)
         
         return res.json(removedData)
      } catch (error) {

         next(error)  
      }
   }
}

export default new SymptomController()