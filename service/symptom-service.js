import SymptomModel from "../models/symptom-model.js" 
import ApiError from "../exceptions/api-error.js"
import SymptomDto from "../dto/symptom-dto.js"

class SymptomService {

   async createSymptom(userId, symptom) {

      const symptomData = await SymptomModel.create({
         userId,
         ...symptom,
         isDeleted: false
      })

      const symptomDto = new SymptomDto(symptomData)

      return symptomDto
   }

   async getSymptom(userId, query) {
      const symptoms = await SymptomModel.find({userId, ...query, isDeleted: false})
      const symptomsDto = symptoms.map(symptom => new SymptomDto(symptom))

      return symptomsDto
   }  

   async updateSymptom(userId, _id, newSymptom) {
      
      const symptom = await SymptomModel.findOne({_id, userId})

      if(!symptom) {
         throw ApiError.BadRequest('Симптом не найден')
      }

      Object.keys(newSymptom).forEach(field => symptom[field] = newSymptom[field])
      await symptom.save()

      return new SymptomDto(symptom)
   }

   async removeSymptom(userId, query) {

      const symptoms = await SymptomModel.find({userId, ...query})

      if(!symptoms.length) {
         return {removeSymptom: false}
      }

      for(const symptom of symptoms) {
         symptom.isDeleted = true
         await symptom.save()
      }

      return {removeSymptom: true}
   }
}

export default new SymptomService()