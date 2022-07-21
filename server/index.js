import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'

const app = express()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Connected to database")
})

app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(morgan("dev")) // was getting deprecation warning due to import syntax, adding "dev" stops this

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || "Something went wrong!"
  return res.status(status).json({
    success: false,
    status,
    message
  })
})

const port = process.env.PORT || 8800

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})