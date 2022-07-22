import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'
import cors from "cors"
import 'dotenv/config'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import uploadRoute from './routes/uploadRoute.js'

const app = express()

// allow access to public/images folder in server side
app.use(express.static('public'))
app.use('/images', express.static("images"))

app.use(cookieParser())
app.use(express.json())
app.use(helmet({
  crossOriginResourcePolicy: false,
}))
app.use(morgan("dev")) // was getting deprecation warning due to import syntax, adding "dev" stops this
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/upload', uploadRoute)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Connected to database")
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || "Something went wrong!"
  return res.status(status).json({
    success: false,
    status,
    message
  })
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})