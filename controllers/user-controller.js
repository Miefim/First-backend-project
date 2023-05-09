import UserService from '../service/user-service.js'

class UserController {

   async registration(req, res, next) {
      try {
         const {email, password} = req.body
         const userData = await UserService.registration(email, password)
         res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
         
         return res.json(userData)
      } catch (error) {
         return res.json(error.message)
      }
   }

   async login(req, res, next) {
      try {
         
      } catch (error) {
         
      }
   }

   async logout(req, res, next) {
      try {
         
      } catch (error) {
         
      }
   }

   async activation(req, res, next) {
      try {
         
      } catch (error) {
         
      }
   }

   async refresh(req, res, next) {
      try {
         
      } catch (error) {
         
      }
   }

   async getUsers(req, res, next) {
      try {
         
      } catch (error) {
         
      }
   }
   
}

export default new UserController()