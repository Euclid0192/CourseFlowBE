require('dotenv').config()
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import rootRoute from './src/routes/root'
import flowRoute from './src/routes/flowsRoute'
import userRoute from './src/routes/usersRoute'
import authRoute from './src/routes/authRoute'

import connectToMongo from './src/configs/dbConnection'


const PORT = process.env.PORT || 3000
const app = express()

connectToMongo()

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/', rootRoute)
app.use('/flows', flowRoute)
app.use('/user', userRoute)
app.use('/auth', authRoute)

app.use('*', (req, res) => {
    res.json({ message: "404 not found"})
})

app.listen(PORT, () => {
    console.log("Connect on port 3000...")
})