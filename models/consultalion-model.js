import { Schema, model } from 'mongoose'

const ConsultationSchema = new Schema({

   userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
   symptoms: {type: Array, required: true}
   
})

export default model('Consultation', ConsultationSchema)