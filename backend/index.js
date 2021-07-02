const express = require('express')
const persoRoutes = require('./routes/perso')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

//Give your database name please
const dbname = 'personnel'

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/', persoRoutes)
app.use((error, req, res, next) => {
    //console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({message})
})

mongoose.connect('mongodb://localhost/' + dbname)
    .then(res => {
        app.listen(8080)
        console.log("Mongodb works...")
	    console.log("Backend listen in 8080")
    })
    .catch(err => {
        console.log('Tsy vonona ny mongo');
        console.log(err)
    })
