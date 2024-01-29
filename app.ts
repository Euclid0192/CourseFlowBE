require('dotenv').config()
import express from 'express'
import cookieParser from 'cookie-parser'
import rootRoute from './src/routes/root'
import flowRoute from './src/routes/flowsRoute'

import connectToMongo from './src/configs/dbConnection'


const PORT = process.env.PORT || 3000
const app = express()

connectToMongo()

app.use(express.json())
app.use(cookieParser())

app.use('/', rootRoute)
app.use('/flows', flowRoute)

app.listen(PORT, () => {
    console.log("Connect on port 3000...")
})