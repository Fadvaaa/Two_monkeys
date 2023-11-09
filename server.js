require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const compression = require('compression')
const cors = require('cors')
const db = require('./config/db')
const SendJson = require('./utils/SendJson')
const app = express()

db.connect()

app.use(cors({ origin: '*' }))
app.use(logger('dev'))
app.use(compression({ level: 6 }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


const userRoute = require('./Routes/userRoute')
const profileRoute = require('./Routes/profileRoute')
const notificationRoute = require('./Routes/notificationRoute')

app.use('/users',userRoute)
app.use('/profiles',profileRoute)
app.use('/notifications',notificationRoute)

app.use((req, res) =>
    SendJson(res, res.result ? res.result : { message: 'Page not found', code: 404 })
)

const port = process.env.PORT || 3999
app.listen(port, () => console.log(`App running on port ${port}`))