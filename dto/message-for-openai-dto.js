class MessageForOpenAiDto {
   
   role
   content

   constructor(model){

      this.role = model.role
      this.content = model.content
      
   }
   
}

export default MessageForOpenAiDto