# Health guide API

## Registration and authorization

### Registration `POST` `http://localhost:5000/api/registration`

#### body

   {
      "email": string,
      "password": string
   }

#### response

   {
      "user": {
         "id": string,
         "email": string,
         "role": [
            string,
            string
         ],
         "isActivated": boolean
      },
      "accessToken": string,
      "refreshToken": string
   }

### Login `POST` `http://localhost:5000/api/login`

#### body

   {
      "email": string,
      "password": string
   }

#### response

   {
      "user": {
         "id": string,
         "email": string,
         "role": [
            string,
            string
         ],
         "isActivated": boolean
      },
      "accessToken": string,
      "refreshToken": string
   }

### Logout `POST` `http://localhost:5000/api/logout`

#### response

   {
      "success": boolean
   }

### Refresh token `GET` `http://localhost:5000/api/refresh`

#### response

   {
      "user": {
         "id": string,
         "email": string,
         "role": [
            string,
            string
         ],
         "isActivated": boolean
      },
      "accessToken": string,
      "refreshToken": string
   }

### User list (Admin) `GET` `http://localhost:5000/api/refresh`

   #### header

   {
      Authorization: Bearer accessToken
   }

   #### response 

      [
         {
            "_id": string,
            "email": string,
            "password": string,
            "role": [
               string,
               string
            ],
            "isActivated": boolean,
            "activationLink": string,
            "__v": number
         },
         ...
      ]

## Questionnaire

### Create questionnaire `POST` `http://localhost:5000/api/questionnaire/create`

#### header

   {
      Authorization: Bearer accessToken
   }

#### body

   {
      "firstName": string,
      "sex": string,
      "weight": number,
      "height": number
   }

#### response

   {
      "userId": string,
      "firstName": string,
      "sex": string,
      "weight": number,
      "height": number,
      "_id": string,
      "__v": number 
   }

### Update questionnaire `PUT` `http://localhost:5000/api/questionnaire/update`

#### header

   {
      Authorization: Bearer accessToken
   }

#### body

   {
      "firstName": string,
      "sex": string,
      "weight": number,
      "height": number
   }

#### response

   {
      "userId": string,
      "firstName": string,
      "sex": string,
      "weight": number,
      "height": number,
      "_id": string,
      "__v": number 
   }

### Get questionnaire `GET` `http://localhost:5000/api/questionnaire`

#### header

   {
      Authorization: Bearer accessToken
   }

#### response

   {
      "userId": string,
      "firstName": string,
      "sex": string,
      "weight": number,
      "height": number,
      "_id": string,
      "__v": number 
   }

### Remove questionnaire `DELETE` `http://localhost:5000/api/questionnaire`

#### header

   {
      Authorization: Bearer accessToken
   }

#### response

   {
      "removeQuestionnaire": true
   }

### Get all questionnaires (Admin) `GET` `http://localhost:5000/api/questionnaires`

#### header

   {
      Authorization: Bearer accessToken
   }

#### response 

   [
      {
         "userId": string,
         "firstName": string,
         "sex": string,
         "weight": number,
         "height": number,
         "_id": string,
         "__v": number 
      },
      ...
   ]

## Symptoms

### Create symptom `POST` `http://localhost:5000/api/symptom/create`

#### header

   {
      Authorization: Bearer accessToken
   }

#### body 

   {
      "localization": string,
      "description": string,
      "isActive": boolean
   }

#### response

   {
      "userId": string,
      "localization": string,
      "description": string,
      "isActive": boolean,
      "_id": string,
      "__v": number
   }

### Get symptom `GET` `http://localhost:5000/api/symptom?id=symptomId`

#### header

   {
      Authorization: Bearer accessToken
   }

#### response

   {
      "userId": string,
      "localization": string,
      "description": string,
      "isActive": boolean,
      "_id": string,
      "__v": number
   }

### Update symptom `PUT` `http://localhost:5000/api/symptom/update?id=symptomId`

#### header

   {
      Authorization: Bearer accessToken
   }

#### body 

   {
      "localization": string,
      "description": string,
      "isActive": boolean
   }

#### response

   {
      "userId": string,
      "localization": string,
      "description": string,
      "isActive": boolean,
      "_id": string,
      "__v": number
   }

### Remove symptom `DELETE` `http://localhost:5000/api/symptom?id=symptomId`

#### header

   {
      Authorization: Bearer accessToken
   }

#### response

   {
      "removeSymptom": true
   }

### Get multiple symptoms `GET` `http://localhost:5000/api/symptoms`

#### header

   {
      Authorization: Bearer accessToken
   }

#### query

   localization=string,
   isActive=boolean

#### response

   [
      {
         "userId": string,
         "localization": string,
         "description": string,
         "isActive": boolean,
         "_id": string,
         "__v": number
      },
      ...
   ]

### Remove multiple symptoms `DELETE` `http://localhost:5000/api/symptoms`

#### header

   {
      Authorization: Bearer accessToken
   }

#### query

   localization=string,
   isActive=boolean

#### response

   {
      "removeSymptoms": true
   }