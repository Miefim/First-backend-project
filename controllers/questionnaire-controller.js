import QuestionnaireService from '../service/questionnaire-service.js'

class QuestionnaireController {

   async createQuestionnaire(req, res, next) {
      try {

         const userId = req.user.id
         const questionnaire = req.questionnaire
         const questionnaireData = await QuestionnaireService.createQuestionnaire(userId, questionnaire)

         return res.json(questionnaireData)

      } catch (error) {

         next(error)

      }
   }

   async updateQuestionnaire(req, res, next) {
      try {

         const userId = req.user.id
         const questionnaire = req.questionnaire
         const questionnaireData = await QuestionnaireService.updateQuestionnaire(userId, questionnaire)

         return res.json(questionnaireData)

      } catch (error) {

         next(error)

      }
   }

}

export default new QuestionnaireController()