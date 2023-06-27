import ApiError from "../exceptions/api-error.js"
import { body, query } from 'express-validator'

export const registerValidation = [
   
   body('email').isEmail(),
   body('password').isLength({min: 3, max: 20})
   
]

export function questionnaireValidation(req, res, next) {

   const { firstName, weight, height, sex } = req.body

   if(!firstName?.trim()) {
      throw ApiError.BadRequest('Введите имя')
   }
   if(!sex) {
      throw ApiError.BadRequest('Выберите пол')
   }
   if(weight) {
      if(typeof +weight !== "number" || Number.isNaN(+weight)) {
         throw ApiError.BadRequest('Вес должен быть числом')
      }
   }
   if(height) {
      if(typeof +height !== "number" || Number.isNaN(+height)) {
         throw ApiError.BadRequest('Рост должен быть числом')
      }
   }

   req.questionnaire = req.body

   next()

}

export const symptomBodyValidation = [
   
   body('localization').optional().notEmpty(),
   body('description').optional().notEmpty()
   
]

export const symptomQueryValidation = [
   
   query('_id').optional().isLength({min: 24, max: 24}),
   query('localization').optional().notEmpty().isString()
   
]

export const consultationQueryValidation = [
   
   query('_id').optional().isLength({min: 24, max: 24}),
   
]

export const createMessagebodyValidation = [
   
   body('message').optional().notEmpty(),
   body('consultationId').notEmpty()
   
]

export const messagesQueryValidation = [
   
   query('_id').optional().isLength({min: 24, max: 24}),
   query('consultationId').optional().isLength({min: 24, max: 24})
   
]

export const responseAiQueryValidation = [

   query('consultationId').isLength({min: 24, max: 24})

]