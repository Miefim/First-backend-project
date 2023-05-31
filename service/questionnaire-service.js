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

   async updateQuestionnaire(userId, data) {

      const questionnaire = await questionnaireModel.findOne({userId})

      if(!questionnaire) {
         throw ApiError.BadRequest('Анкеты не существует') 
      }

      const { firstName, sex, dateOfBirth, weight, height } = data

      questionnaire.firstName = firstName ? firstName : ''
      questionnaire.sex = sex ? sex : ''
      questionnaire.dateOfBirth = dateOfBirth ? dateOfBirth : ''
      questionnaire.weight = weight ? weight : ''
      questionnaire.height = height ? height : ''

      return await questionnaire.save()

   }

}

export default new QuestionnaireService()