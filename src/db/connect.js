const mongoose = require('mongoose')
const config = require('../config')

function connect() {
    mongoose.connect(config.URL_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Conectado")
        })
        .catch((erro) => {
            console.log(`Erro ${erro}`)
        })
}

module.exports = connect()