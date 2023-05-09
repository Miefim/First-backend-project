import { Schema, model } from 'mongoose'

const TokenSchema = new Schema({
   user: {type: Schema.Types.ObjectId, ref: 'User'},
   refreshToken: {type: "string", required: true},
})

export default model('Token', TokenSchema)