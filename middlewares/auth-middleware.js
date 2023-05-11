import tokenService from "../service/token-service.js"
import userModel from '../models/user-model.js'
import ApiError from '../exceptions/api-error.js'

async function authMiddleware(req, _res, next){

   try {
      
      const token = req.headers.authorization?.split(' ')[1]

      if(!token){
         throw ApiError.UnauthorizedError()
      }

      const userData = tokenService.verifyAccessToken(token)

      if(!userData){
         throw ApiError.UnauthorizedError()
      }
      
      const { isActivated } = await userModel.findById(userData.id)

      if(!isActivated){
         throw ApiError.UnauthorizedError('Активируйте аккаунт')
      }
      
      req.user = userData
      next()

   } catch (error) {

      return next(error)

   }

}

export default authMiddleware