import { Configuration, OpenAIApi } from "openai"
import MessageModel from "../models/message-model.js"
import ApiError from "../exceptions/api-error.js"
import MessageForOpenAiDto from "../dto/message-for-openai-dto.js"
import MessageDto from "../dto/message-dto.js"

class OpenAIService {

   async createChat(messages) {
      const openAiApi = new OpenAIApi(
         new Configuration({
            apiKey: process.env.OPENAI_APIKEY
         })
      )

      const response = await openAiApi.createChatCompletion({
         model: "gpt-3.5-turbo",
         messages: messages
      })

      return response.data.choices[0].message
   }

   async getResponseAi(userId, consultationId) {
      const consultationMessages = await MessageModel.find({userId, consultationId, isDeleted: false})

      if(consultationMessages.length === 0) {
         throw ApiError.BadRequest('Массив сообщений пуст')
      }

      const messagesDto = consultationMessages.map(message => new MessageForOpenAiDto(message))
      const responseAi = await this.createChat(messagesDto)

      const responseAiMessage = await MessageModel.create({
         ...responseAi,
         userId,
         consultationId,
         create: Date.now(),
         isDeleted: false
      })

      return new MessageDto(responseAiMessage)
   }

}

export default new OpenAIService()