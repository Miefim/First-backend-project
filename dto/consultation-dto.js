class ConsultationDto {
   
   _id
   userId
   symptoms

   constructor(model){

      this._id = model._id
      this.userId = model.userId
      this.symptoms = model.symptoms
      
   }
   
}

export default ConsultationDto