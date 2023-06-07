import { validationResult } from 'express-validator'
import ApiError from '../exceptions/api-error.js'
import SymptomService from '../service/symptom-service.js'

class SymptomController {

   async createSymptom(req, res, next) {

      try {
         
         const error = validationResult(req)
         
         if(!error.isEmpty()) {
            throw ApiError.BadRequest('Ошибка валидации', error.errors)
         }

         const user = req.user
         const symptom = req.body

         const symptomData = await SymptomService.createSymptom(user, symptom)

         return res.json(symptomData)

      } catch (error) {

         next(error)
         
      }

   }

   async getSymptom(req, res, next) {
      
      try {
         
         const user = req.user
         const symptomId = req.query.id

         if(!symptomId) {
            throw ApiError.BadRequest('Укажите id симптома')
         }

         const symptom = await SymptomService.getSymptom(user, symptomId)   

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

         const user = req.user
         const symptomId = req.query.id
         const newSymptom = req.body

         if(!symptomId) {
            throw ApiError.BadRequest('Укажите id симптома')
         }
         
         const updatedSymptom = await SymptomService.updateSymptom(user, symptomId, newSymptom)

         return res.json(updatedSymptom)

      } catch (error) {

         next(error)
         
      }

   }

   async removeSymptom(req, res, next) {
      
      try {
         
         const user = req.user
         const symptomId = req.query.id

         if(!symptomId) {
            throw ApiError.BadRequest('Укажите id симптома')
         }
         
         const removedSymptom = await SymptomService.removeSymptom(user, symptomId) 

         return res.json(removedSymptom)

      } catch (error) {

         next(error)
         
      }

   }

   async getSymptoms(req, res, next) {
      
      try {

         const user = req.user
         const query = req.query
         const symptoms = await SymptomService.getSymptoms(user, query)
         
         return res.json(symptoms)

      } catch (error) {

         next(error)
         
      }

   }

   async removeSymptoms(req, res, next) {
      
      try {
         
         const user = req.user
         const query = req.query
         const removedSymptoms = await SymptomService.removeSymptoms(user, query)
         
         return res.json(removedSymptoms)

      } catch (error) {

         next(error)
         
      }

   }

}

export default new SymptomController()