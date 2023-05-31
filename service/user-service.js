import { v4 } from 'uuid'
import bcrypt from 'bcrypt'

import userModel from '../models/user-model.js'
import mailService from './mail-service.js'
import UserDto from '../dto/user-dto.js'
import tokenService from './token-service.js'
import ApiError from '../exceptions/api-error.js'

class UserService {

   async registration(email, password){

      const candidate = await userModel.findOne({email})
      
      if(candidate){ 
         throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существует`)
      }

      const hashPassword = await bcrypt.hash(password, 5)
      const activationLink = v4()
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activation/${activationLink}`)
      const user = await userModel.create({email, password: hashPassword, activationLink, role: ["USER"]})
      
      const userDto = new UserDto(user)
      const tokens = tokenService.generateToken({...userDto})
      await tokenService.saveToken(userDto.id, tokens.refreshToken)

      return {user: userDto, ...tokens}
      
   }

   async login(email, password){
      
      const user = await userModel.findOne({email})
      
      if(!user){
         throw ApiError.BadRequest(`Неверный логин или пароль`)
      }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if(!isValidPassword){
         throw ApiError.BadRequest("Неверный логин или пароль")
      }

      const userDto = new UserDto(user)
      const tokens = tokenService.generateToken({...userDto})
      await tokenService.saveToken(userDto.id, tokens.refreshToken)

      return {user: userDto, ...tokens}

   }

   async activalion(link){

      const user = await userModel.findOne({activationLink: link})

      if(!user){
         throw ApiError.BadRequest('Некорректная ссылка')
      }

      user.isActivated = true
      await user.save()

   }

   async logout(refreshToken){

      return await tokenService.removeToken(refreshToken)

   }

   async refresh(refreshToken){

      if(!refreshToken){
         throw ApiError.UnauthorizedError()
      }

      const userData = tokenService.verifyRefreshToken(refreshToken)
      const tokenFromDB = await tokenService.findRefreshToken(refreshToken)
   
      if(!userData || !tokenFromDB){
         throw ApiError.UnauthorizedError()
      }

      const user = await userModel.findById(userData.id)

      const userDto = new UserDto(user)
      const tokens = tokenService.generateToken({...userDto})
      await tokenService.saveToken(userDto.id, tokens.refreshToken)

      return {user: userDto, ...tokens}

   }

   async getAllusers(userData){

      const users = await userModel.find()
      return users
      
   }

}

export default new UserService()