import symptomModel from "../models/symptom-model.js"
import consultationModel from "../models/consultalion-model.js"
import ApiError from "../exceptions/api-error.js"
import isEmptyObj from "../utils/isEmptyObj.js"

class ConsultationService {

   async createConsultation(user) {
      const userId = user.id
      const symptoms = await symptomModel.find({userId, isActive: true})

      if(!symptoms.length) {
         throw ApiError.BadRequest('Чтобы получить консультацию, необходимо добавить симптомы')
      }

      return await consultationModel.create({userId, symptoms})
   }

   async getConsultation(userId, query) {

      const symptom = await consultationModel.find({userId, ...query})

      if(!symptom) {
         throw ApiError.BadRequest('Консультация не найдена')
      }

      return symptom
   }

   async removeConsultation(userId, query) {

      const isEmpty = isEmptyObj(query)

      if(!isEmpty) {
         await consultationModel.deleteOne({userId, ...query})
         return {
            deleteConsultation: true
         }
      }
      else {
         await consultationModel.deleteMany({userId})
         return {
            deleteAllConsultations: true
         }
      }
   }  

}

export default new ConsultationService()