require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

// initialize Express server
const app = express()

// require router
// const users = require('./routes/api/users')

// middleware to allow to CORS requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next()
})

// bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// config our db
const db = process.env.MONGOD_URI

// connect to mongodb (using Atlas)
mongoose.connect(db)
    .then((() => console.log('MongoDB connected... 🥭')))
    .catch(err => console.log(err))

// test routing
app.get('/', (req, res) => {
    res.send("Hello world!\n Server is up and running 👍")
})

// passport middleware
app.use(passport.initialize())

// passport JWT token set/config
require('./config/passport')(passport)

// setup our routes

// start our server
app.listen(process.env.PORT || 5000, () => console.log(`Server is running on port ${process.env.PORT} and things are looking good 😃`))