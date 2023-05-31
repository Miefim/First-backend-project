class QuestionnaireDto {
   
   id
   userId
   firstName
   sex
   dateOfBirth
   weight
   height

   constructor(model){

      this.id = model._id
      this.userId = model.userId
      this.firstName = model.firstName
      this.sex = model.sex
      this.dateOfBirth = model.dateOfBirth
      this.weight = model.weight
      this.height = model.height
      
   }
   
}

export default QuestionnaireDto