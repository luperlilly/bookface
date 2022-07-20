import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'
import 'dotenv/config'

const app = express()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Connected to database")
})

app.use(express.json())
app.use(helmet())
app.use(morgan("dev")) // was getting deprecation warning due to import syntax, adding "dev" stops this

const port = process.env.PORT

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})