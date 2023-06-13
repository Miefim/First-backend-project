import ConsultationService from '../service/consultation-service.js'

class Consultation {
   async createConsultation(req, res, next) {
      try {

         const user = req.user
         const consultationData = await ConsultationService.createConsultation(user)

         return res.json(consultationData)

      } catch (error) {

         next(error)

      }
   }

   async getConsultation(req, res, next) {
      try {

         const userId = req.user.id
         const query = req.query
         const consultationData = await ConsultationService.getConsultation(userId, query)

         return res.json(consultationData)

      } catch (error) {

         next(error)

      }
   }

   async removeConsultation(req, res, next) {
      try {

         const userId = req.user.id
         const query = req.query
         const consultationData = await ConsultationService.removeConsultation(userId, query)

         return res.json(consultationData)

      } catch (error) {

         next(error)

      }
   }

}

export default new Consultation()