import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
   email: {type: "string", unique: true, required: true},
   password: {type: "string", required: true},
   isActivated: {type: "boolean", default: false},
   activationLink: {type: "string"}
})

export default model('User', UserSchema)