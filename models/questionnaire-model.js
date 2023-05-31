import { Schema, model } from 'mongoose'

const QuestionnaireSchema = new Schema({

   userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
   firstName: {type: String, required: true}, 
   sex: {type: String, required: true},
   dateOfBirth: {type: Date},
   weight: {type: Number},
   height: {type: Number},
   
})

export default model('Questionnaire', QuestionnaireSchema)