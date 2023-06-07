import { Schema, model } from 'mongoose'

const SymptomSchema = new Schema({

   userId: {type: Schema.Types.ObjectId, ref: 'User'},
   localization: {type: String, required: true},
   description: {type: String, required: true},
   isActive: {type: Boolean, required: true}
   
})

export default model('Symptom', SymptomSchema)