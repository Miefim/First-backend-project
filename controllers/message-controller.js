import { validationResult } from "express-validator"
import MessageService from "../service/message-service.js"
import OpenAiService from "../service/openai-service.js"
import ApiError from "../exceptions/api-error.js"

class MessageController {

   async createMessage(req, res, next) {
      try {    
         const validationError = validationResult(req)

         if(!validationError.isEmpty()) {
            throw ApiError.BadRequest('Ошибка валидации', validationError.errors)
         }

         const userId = req.user.id
         const {consultationId, message} = req.body
         const createdMessage = await MessageService.createMessage(userId, consultationId, message)
         
         return res.json(createdMessage)
      } catch (error) {

         next(error)
      }
   }

   async getMessages(req, res, next) {
      try {
         const validationError = validationResult(req)

         if(!validationError.isEmpty()) {
            throw ApiError.BadRequest('Ошибка валидации', validationError.errors)
         }

         const userId = req.user.id
         const consultationId = req.query.consultationId
         const _id = req.query._id
         const messages = await MessageService.getMessages(userId, consultationId, _id)

         return res.json(messages)   
      } catch (error) {

         next(error)
      }
   }

   async getResponseAi(req, res, next) {
      try {
         const validationError = validationResult(req)

         if(!validationError.isEmpty()) {
            throw ApiError.BadRequest('Ошибка валидации', validationError.errors)
         }

         const userId = req.user.id
         const consultationId = req.query.consultationId
         const responseAi = await OpenAiService.getResponseAi(userId, consultationId)

         return res.json(responseAi)
      } catch (error) {
         
         next(error)
      }
   }

   async removeMessage(req, res, next) {
      try {
         const validationError = validationResult(req)

         if(!validationError.isEmpty()) {
            throw ApiError.BadRequest('Ошибка валидации', validationError.errors)
         }
         
         const userId = req.user.id
         const query = req.query
         const removeData = await MessageService.removeMessage(userId, query)

         return res.json(removeData)
      } catch (error) {
         
         next(error)
      }
   }
}

export default new MessageController()