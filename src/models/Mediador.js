const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Mediador = new Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contato:{
        type: String,
        required: true
    },
    endereco:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    }
})

mongoose.model('mediadores', Mediador)