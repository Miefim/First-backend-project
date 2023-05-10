import tokenService from "../service/token-service.js"

function authMiddleware(req, res, next){
   try {
      const token = req.headers.authorization?.split(' ')[1]

      if(!token){
         throw new Error('Нет доступа')
      }

      const userData = tokenService.verifyAccessToken(token)

      if(!userData){
         throw new Error('Нет доступа')
      }

      req.user = userData
      next()

   } catch (error) {
      return res.json(error.message)
   }
}

export default authMiddleware