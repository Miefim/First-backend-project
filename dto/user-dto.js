class UserDto {
   
   id
   email
   role
   isActivated

   constructor(model){

      this.id = model._id
      this.email = model.email
      this.role = model.role
      this.isActivated = model.isActivated
      
   }
   
}

export default UserDto