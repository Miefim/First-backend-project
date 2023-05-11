import { validationResult } from 'express-validator'

import UserService from '../service/user-service.js'
import ApiError from '../exceptions/api-error.js'

class UserController {

   async registration(req, res, next) {

      try {

         const error = validationResult(req)

         if(!error.isEmpty()){
            throw ApiError.BadRequest("Невалидный логин или пароль", error)
         }

         const {email, password} = req.body
         const userData = await UserService.registration(email, password)
         res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
         
         return res.json(userData)

      } catch (error) {

         next(error)

      }

   }

   async login(req, res, next) {

      try {

         const error = validationResult(req)
         
         if(!error.isEmpty()){
            throw ApiError.BadRequest("Невалидный логин или пароль", error)
         }

         const {email, password} = req.body
         const userData = await UserService.login(email, password)
         res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
         
         return res.json(userData)

      } catch (error) {

         next(error)

      }

   }

   async logout(req, res, next) {

      try {

         const {refreshToken} = req.cookies
         await UserService.logout(refreshToken)
         res.clearCookie('refreshToken')

         return res.json({
            success: true
         })

      } catch (error) {

         next(error)

      }

   }

   async activation(req, res, next) {

      try {

         const link = req.params.link
         await UserService.activalion(link)

         return res.redirect(process.env.CLIENT_URL)

      } catch (error) {

         next(error)

      }

   }

   async refresh(req, res, next) {

      try {

         const {refreshToken} = req.cookies
         const userData = await UserService.refresh(refreshToken)
         res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

         return res.json(userData)

      } catch (error) {

         next(error)

      }

   }

   async getUsers(_req, res, next) {

      try {
         
         const users = await UserService.getAllusers()
         return res.json(users)

      } catch (error) {

         next(error)

      }

   }
   
}

export default new UserController()