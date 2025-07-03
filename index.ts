import express from 'express'
import mongoose from 'mongoose'
//import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world! 🚀 Your Express server is running.' })
})
//app.use(cors())
app.listen(5000, () => console.log('Server on port 5000'))

