import questionnaireModel from "../models/questionnaire-model.js"
import ApiError from "../exceptions/api-error.js"

class QuestionnaireService {

   async createQuestionnaire(userId, data) {

      const questionnaire = await questionnaireModel.findOne({userId})

      if(questionnaire) {
         throw ApiError.BadRequest('Анкета уже существует') 
      }

      const questionnaireData = await questionnaireModel.create({
         userId,
         ...data
      })

      return questionnaireData

   }
   
   async getQuestionnaire(userId) {

      const questionnaire = await questionnaireModel.findOne({userId})

      if(!questionnaire) {
         throw ApiError.BadRequest('Анкеты не существует') 
      }

      return questionnaire

   }

   async updateQuestionnaire(userId, data) {

      const questionnaire = await questionnaireModel.findOne({userId})

      if(!questionnaire) {
         throw ApiError.BadRequest('Анкеты не существует') 
      }

      const { firstName, sex, dateOfBirth, weight, height } = data

      firstName ? questionnaire.firstName = firstName : ''
      sex ? questionnaire.sex = sex : ''
      dateOfBirth ? questionnaire.dateOfBirth = dateOfBirth : ''
      weight ? questionnaire.weight = weight : ''
      height ? questionnaire.height = height : ''

      return await questionnaire.save()

   }

   async removeQuestionnaire(userId) {

      const questionnaire = await questionnaireModel.findOne({userId})

      if(!questionnaire) {
         throw ApiError.BadRequest('Анкеты не существует') 
      }

      await questionnaireModel.deleteOne(questionnaire)

      return {removeQuestionnaire: true}

   }

   async getQuestionnaires() {

      const questionnaires = await questionnaireModel.find()

      return questionnaires

   }

}

export default new QuestionnaireService()