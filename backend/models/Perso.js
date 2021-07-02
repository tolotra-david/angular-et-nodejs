const mongoose = require('mongoose')
const Schema = mongoose.Schema

const persoSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('User', persoSchema)
