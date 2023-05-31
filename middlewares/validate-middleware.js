import ApiError from "../exceptions/api-error.js"
import { body } from 'express-validator'

export const registerValidation = [
   
   body('email').isEmail(),
   body('password').isLength({min: 3, max: 20})
   
]

export function questionnaireValidation(req, res, next) {

   const { firstName, weight, height, sex } = req.body

   if(!firstName.trim()) {
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
