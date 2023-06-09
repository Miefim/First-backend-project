import ApiError from "../exceptions/api-error.js"

function isAdminRoleMiddleware(req, _res, next) {

   const roles = req.user.role
   const isAdmin = roles.find(role => role === "ADMIN")
         
   if(!isAdmin){
      throw new ApiError(403, 'Нет доступа')
   }

   next()

}

export default isAdminRoleMiddleware