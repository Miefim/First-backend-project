import 'dotenv/config.js'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './router/index.js'


const PORT = process.env.PORT || 5000
const app = express() 

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router) 

const start = async () => {
   try {
      await mongoose.connect(process.env.DB_URL) 
      app.listen(PORT, () => console.log(`server started on PORT = ${PORT}`))
   } catch (error) {
      console.log(error)
   }
}

start() 