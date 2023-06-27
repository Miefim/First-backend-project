export default function firstMessageGenerator(questionnaire, symptoms) {
   let { firstName, sex, dateOfBirth, weight, height } = questionnaire
   let symptomsStr = ''

   symptoms.forEach((symptom, i) => symptomsStr +=`\n${i + 1}) ${symptom.description}`)
   dateOfBirth = dateOfBirth ? `, дата рождения: ${dateOfBirth}` : ''
   weight = weight ? `, мой вес: ${weight}` : ''
   height = height ? `, мой рост: ${height}` : ''

   return `Привет меня зовут ${firstName}, пол: ${sex}${dateOfBirth}${weight}${height}.\nУ меня есть следующие проблемы со здоровьем:${symptomsStr}`
}