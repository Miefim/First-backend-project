export default function removeEmptyFields(obj) {
   const result = {}
   Object.keys(obj).forEach(key => {
      obj[key] !== undefined ? result[key] = obj[key] : ''
   })

   return result
} 