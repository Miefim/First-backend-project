class SymptomDto {
   
   _id
   userId
   localization
   description

   constructor(model){

      this._id = model._id
      this.userId = model.userId
      this.localization = model.localization
      this.description = model.description
    
   }
   
}

export default SymptomDto