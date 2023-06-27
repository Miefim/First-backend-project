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
    }

#### response

    {
      "_id": string,
      "userId": string,
      "localization": string,
      "description": string,
    }

### Get symptom `GET` `http://localhost:5000/api/symptom`

#### header

    {
      Authorization: Bearer accessToken
    }

#### query

    _id=string (optional)
    localization=string (optional)

#### response

    [
      {
         "_id": string,
         "userId": string,
         "localization": string,
         "description": string
      },
      ...
    ]

#### description

   If you want to get a specific symptom, then pass it "_id" as a parameter. If you do not pass parameters, all user symbols will be returned

### Update symptom `PUT` `http://localhost:5000/api/symptom/update?id=symptomId`

#### header

    {
      Authorization: Bearer accessToken
    }

#### body 

    {
      "localization": string,
      "description": string
    }

#### response

    {
      "_id": string,
      "userId": string,
      "localization": string,
      "description": string
    }

### Remove symptom `DELETE` `http://localhost:5000/api/symptom`

#### header

    {
      Authorization: Bearer accessToken
    }

#### query

    _id=string (optional)
    localization=string (optional)


#### response

    {
      "removeSymptom": true
    }

#### description

   If you pass the optional "localization" and "_id" parameters, only those elements will be removed
   whose fields correspond to the parameters. If not passed then all custom symptoms will be removed

## Consultations

### Create consultation `POST` `http://localhost:5000/api/consultation/create`

#### header

    {
      Authorization: Bearer accessToken
    }

#### response

    {
      "_id": string,
      "userId": string,
      "symptoms": [
         {
            "_id": string,
            "userId": string,
            "localization": string,
            "description": string
         },
         ...
      ]
    }

### Get consultation(s) `GET` `http://localhost:5000/api/consultation`

#### header

    {
      Authorization: Bearer accessToken
    }

#### query

    _id=string (optional)

#### response

    [
      {
         "_id": string,
         "userId": string,
         "symptoms": [
            {
               "_id": string,
               "userId": string,
               "localization": string,
               "description": string,
            },
            ...
         ]
      },
      ...
    ]

#### description

   If the "_id" parameter is passed, then the method returns one consultation, if not passed, then all user consultations

### Remove consultation(s) `DELETE` `http://localhost:5000/api/consultation`

#### header

    {
      Authorization: Bearer accessToken
    }

#### query

    _id=string (optional)

#### response

    {
      "removedConsultation": boolean
    }

#### description

   If the "_id" parameter is passed, then one consultation is deleted, if not passed, then all user consultations are deleted

## Messages

### Create message `POST` `http://localhost:5000/api/message/create`

#### header

    {
      Authorization: Bearer accessToken
    }

#### body 

    {
      "consultationId": string,
      "message": string
    }

#### response

    {
      "_id": string,
      "userId": string,
      "consultationId": string,
      "role": string,
      "content": string,
      "create": date
    }

#### description

   The "message" field in the request body is optional, but if this field is sent, then it must not be empty

### Get messages `GET` `http://localhost:5000/api/message`

#### header

    {
      Authorization: Bearer accessToken
    }

#### query 

    _id=string (optional)
    consultationId=string (optional)

#### response

    [
      {
         "userId": string,
         "consultationId": string,
         "role": string,
         "content": string,
         "create": date
      },
      ...
    ]

### Remove message(s) `DELETE` `http://localhost:5000/api/message`

#### header

    {
      Authorization: Bearer accessToken
    }

#### query 

    _id=string (optional)
    consultationId=string (optional)

#### response

    {
      "isRemovedMessage": boolean
    }

#### description

   If you do not pass the "consultationId" parameter, then the method will delete absolutely all messages of the authorized user, if you pass, then all messages of a specific consultation. If you pass the "_id" parameter, then a specific message will be deleted.

### Get a response from AI `GET` `http://localhost:5000/api/message/responseAi`

#### header

    {
      Authorization: Bearer accessToken
    }

#### query 

    consultationId=string (required)

#### response

    {
      "userId": string,
      "consultationId": string,
      "role": string,
      "content": string,
      "create": date
    }

#### description

   The "consultationId" parameter is required; it determines which consultation the response is generated for.
