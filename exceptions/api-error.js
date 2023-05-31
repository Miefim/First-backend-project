class ApiError extends Error {

   constructor(status, message, errors = []){

      super(message)
      this.status = status
      this.errors = errors

   }

   static UnauthorizedError(message){

      return new ApiError(401, message ? message : 'Вы не авторизованы')

   }

   static BadRequest(message, errors = []){

      return new ApiError(400, message, errors)
      
   }

   static smtpError(status, message, errors = []){

      return new ApiError(status, message, errors)
      
   }

}

export default ApiError