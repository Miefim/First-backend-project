import userModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import mailService from './mail-service.js'
import UserDto from '../dto/user-dto.js'
import tokenService from './token-service.js'

class UserService {

   async registration(email, password) {

      const candidate = await userModel.findOne({email})
      
      if(candidate){
         throw new Error(`Пользователь с почтой ${email} уже существует`)
      }

      const hashPassword = await bcrypt.hash(password, 5)
      const activationLink = v4()
      const user = await userModel.create({email, password: hashPassword, activationLink})
      await mailService.sendActivationMail(email, activationLink)
      
      const userDto = new UserDto(user)
      const tokens = tokenService.generateToken({...userDto})
      await tokenService.saveToken(userDto.id, tokens.refreshToken)

      return {user: userDto, ...tokens}
      
   }

}

export default new UserService()