import SymptomModel from "../models/symptom-model.js"
import ConsultationModel from "../models/consultation-model.js"
import ApiError from "../exceptions/api-error.js"
import SymptomDto from "../dto/symptom-dto.js"
import ConsultationDto from "../dto/consultation-dto.js"

class ConsultationService {

   async createConsultation(userId) {

      const symptoms = await SymptomModel.find({userId, isDeleted: false})

      if(!symptoms.length) {
         throw ApiError.BadRequest('Чтобы получить консультацию, необходимо добавить симптомы')
      }

      const symptomsDto = symptoms.map(symptom => new SymptomDto(symptom))
      const consultation = await ConsultationModel.create({userId, symptoms: symptomsDto, isDeleted: false})
      
      return new ConsultationDto(consultation)
   }

   async getConsultation(userId, query) {

      const consultations = await ConsultationModel.find({userId, ...query, isDeleted: false})

      if(!consultations) {
         throw ApiError.BadRequest('Консультация не найдена')
      }

      const consultationsDto = consultations.map(consultation => new ConsultationDto(consultation)) 

      return consultationsDto
   }

   async removeConsultation(userId, query) {

      const consultations = await ConsultationModel.find({userId, ...query})

      if(!consultations.length) {
         return {removedConsultation: false}
      }

      for(const consultation of consultations) {
         consultation.isDeleted = true
         await consultation.save()
      }

      return {removedConsultation: true}
   } 
}

export default new ConsultationService()