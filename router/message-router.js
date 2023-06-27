import { Router } from "express"
import { 
   createMessagebodyValidation, 
   messagesQueryValidation, 
   responseAiQueryValidation
} from "../middlewares/validate-middleware.js"
import MessageController from "../controllers/message-controller.js"
import authMiddleware from "../middlewares/auth-middleware.js"

const messageRouter = new Router()

messageRouter.post('/message/create', authMiddleware, createMessagebodyValidation, MessageController.createMessage)
messageRouter.get('/message', authMiddleware, messagesQueryValidation, MessageController.getMessages)
messageRouter.delete('/message', authMiddleware, messagesQueryValidation, MessageController.removeMessage)
messageRouter.get('/message/responseAi', authMiddleware, responseAiQueryValidation, MessageController.getResponseAi)

export default messageRouter