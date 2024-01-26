require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/', require('./src/routes/root'))
app.use('/flows', require('./src/routes/flowsRoute'))

app.listen(PORT, () => {
    console.log("Connect on port 3000...")
})