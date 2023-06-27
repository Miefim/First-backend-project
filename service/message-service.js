import MessageModel from "../models/message-model.js"
import QuestionnaireModel from "../models/questionnaire-model.js"
import ConsultationModel from "../models/consultation-model.js"
import ApiError from "../exceptions/api-error.js"
import MessageDto from "../dto/message-dto.js"
import firstMessageGenerator from "../utils/generator-first-message.js"
import removeEmptyFields from "../utils/remove-empty-field.js"

class MessageService {

   async createMessage(userId, consultationId, message) {
      let content = message
      const consultationMessages = await MessageModel.find({userId, consultationId, isDeleted: false})

      if(!consultationMessages.length) {
         const questionnaire = await QuestionnaireModel.findOne({userId})
         const consultation = await ConsultationModel.findById(consultationId)
         if(!consultation) {
            throw ApiError.BadRequest('Неверный id консультации')
         }
         content = firstMessageGenerator(questionnaire, consultation.symptoms)
      }

      const createdMessage = await MessageModel.create({
         userId,
         consultationId,
         role: 'user',
         content,
         create: Date.now(),
         isDeleted: false
      })

      return new MessageDto(createdMessage)
   }

   async getMessages(userId, consultationId, _id) {
      const params = removeEmptyFields({userId, consultationId, _id})
      const findedMessages = await MessageModel.find({...params, isDeleted: false})

      return findedMessages.map(message => new MessageDto(message))
   }

   async removeMessage(userId, query) {
      const messages = await MessageModel.find({userId, ...query})

      if(!messages.length) {
         return {isRemovedMessage: false}
      }

      for(const message of messages) {
         message.isDeleted = true
         await message.save()
      }

      return {isRemovedMessage: true}
   }

}

export default new MessageService()