import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-model.js'

class TokenService {

   generateToken(payload){
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1m'})
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
      return {
         accessToken,
         refreshToken  
      }
   }

   async saveToken(userId, refreshToken){
      const tokenData = await tokenModel.findOne({user: userId})
      
      if(tokenData){
         tokenData.refreshToken = refreshToken
         return await tokenData.save()
      }

      const token = await tokenModel.create({user: userId, refreshToken})
      return token
   }

   async removeToken(refreshToken){
      return await tokenModel.deleteOne({refreshToken})
   }

   verifyRefreshToken(refreshToken){
      try {
         const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
         return userData
      } catch (error) {
         return null
      }
   }

   verifyAccessToken(accessToken){
      try {
         const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
         return userData
      } catch (error) {
         return null
      }
   }

   async findRefreshToken(refreshToken){
      const token = await tokenModel.findOne({refreshToken})
      return token
   }

}

export default new TokenService()