import ApiError from "../exceptions/api-error.js"
import SymptomModel from "../models/symptom-model.js"

class SymptomService {

   async createSymptom(user, symptom) {

      const symptomData = await SymptomModel.create({
         userId: user.id,
         ...symptom,
         isActive: true
      })

      return symptomData

   }

   async getSymptom(user, symptomId) {

      const symptom = await SymptomModel.findOne({_id: symptomId, userId: user.id})

      if(!symptom) {
         throw ApiError.BadRequest('Симптом не найден')
      }

      return symptom

   }  

   async updateSymptom(user, symptomId, newSymptom) {
      
      const symptom = await SymptomModel.findOne({_id: symptomId, userId: user.id})

      if(!symptom) {
         throw ApiError.BadRequest('Симптом не найден')
      }

      const { localization, description, isActive } = newSymptom
      
      localization ? symptom.localization = localization : ''
      description ? symptom.description = description : ''
      isActive !== undefined ? symptom.isActive = isActive : ''

      return await symptom.save()

   }

   async removeSymptom(user, symptomId) {

      const symptom = await SymptomModel.findOne({_id: symptomId, userId: user.id})

      if(!symptom) {
         throw ApiError.BadRequest('Симптом не найден')
      }

      await SymptomModel.deleteOne(symptom)

      return {removeSymptom: true}

   }

   async getSymptoms(user, query) {

      const { localization, active } = query

      const params = {
         userId: user.id
      }

      localization ? params.localization = localization : ''
      active !== undefined ? params.isActive = active : ''

      return await SymptomModel.find(params)

   }

   async removeSymptoms(user, query) {

      const { localization, active } = query

      const params = {
         userId: user.id
      }

      localization ? params.localization = localization : ''
      active !== undefined ? params.isActive = active : ''

      await SymptomModel.deleteMany(params)

      return {removeSymptoms: true}
      
   }

}

export default new SymptomService()