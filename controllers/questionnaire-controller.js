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

   async getQuestionnaire(req, res, next) {
      try {

         const userId = req.user.id
         const questionnaire = await QuestionnaireService.getQuestionnaire(userId)

         return res.json(questionnaire)

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

   async removeQuestionnaire(req, res, next) {
      try {

         const userId = req.user.id
         const questionnaire = await QuestionnaireService.removeQuestionnaire(userId)

         return res.json(questionnaire)

      } catch (error) {

         next(error)

      }
   }

   async getQuestionnaires(req, res, next) {
      try {

         const questionnaires = await QuestionnaireService.getQuestionnaires()

         return res.json(questionnaires)

      } catch (error) {

         next(error)

      }
   }

}

export default new QuestionnaireController()