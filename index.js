import "dotenv/config.js"
import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./router/user-router.js"
import questionnaireRouter from "./router/questionnaire-router.js"
import symptomRouter from "./router/symptom-router.js"
import consultationRouter from "./router/consultation-router.js"
import messageRouter from "./router/message-router.js"
import errorMiddleware from "./middlewares/error-middleware.js"

const PORT = process.env.PORT || 5000
const app = express() 

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', userRouter)
app.use('/api', questionnaireRouter)
app.use('/api', symptomRouter)
app.use('/api', consultationRouter)
app.use('/api', messageRouter) 
app.use(errorMiddleware)

const start = async () => {

   try {
      await mongoose.connect(process.env.DB_URL) 
      app.listen(PORT, () => console.log(`server started on PORT = ${PORT}`))
   } catch (error) {

      console.log(error)
   }
}

start() 