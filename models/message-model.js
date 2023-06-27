import { Schema, model } from 'mongoose'

const MessageSchema = new Schema({

   userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
   consultationId: {type: Schema.Types.ObjectId, ref: 'Consultation', required: true},
   role: {type: String, required: true},
   content: {type: String, required: true},
   create: {type: Date, required: true},
   isDeleted: {type: Boolean}
   
})

export default model('Message', MessageSchema)