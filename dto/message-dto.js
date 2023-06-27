class MessageDto {
   
   _id
   userId
   consultationId
   role
   content
   create

   constructor(model){

      this._id = model._id
      this.userId = model.userId
      this.consultationId = model.consultationId
      this.role = model.role
      this.content = model.content
      this.create = model.create
      
   }
   
}

export default MessageDto