const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Morador = new Schema({
    nome:{
        type: String,
        required: true
    },
    perfil:{
        type: String,
        required: true
    },
    demanda: {
        type: String,
        required: true
    }
})

mongoose.model('moradores', Morador)