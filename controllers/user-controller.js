import { validationResult } from 'express-validator'
import UserService from '../service/user-service.js'


class UserController {

   async registration(req, res, next) {
      try {
         const error = validationResult(req)

         if(!error.isEmpty()){
            throw new Error("Невалидный логин или пароль")
         }

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
         const error = validationResult(req)
         
         if(!error.isEmpty()){
            throw new Error("Невалидный логин или пароль")
         }

         const {email, password} = req.body
         const userData = await UserService.login(email, password)
         res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
         
         return res.json(userData)
      } catch (error) {
         return res.json(error.message)
      }
   }

   async logout(req, res, next) {
      try {
         const {refreshToken} = req.cookies
         await UserService.logout(refreshToken)
         res.clearCookie('refreshToken')

         return res.status(200).json()
      } catch (error) {
         
      }
   }

   async activation(req, res, next) {
      try {
         const link = req.params.link
         await UserService.activalion(link)

         return res.redirect(process.env.CLIENT_URL)
      } catch (error) {
         
      }
   }

   async refresh(req, res, next) {
      try {
         const {refreshToken} = req.cookies
         const userData = await UserService.refresh(refreshToken)
         res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

         return res.json(userData)
      } catch (error) {
         return res.json(error.message)
      }
   }

   async getUsers(req, res, next) {
      try {
        const users = await UserService.getAllusers()

        res.json(users)
      } catch (error) {
         
      }
   }
   
}

export default new UserController()