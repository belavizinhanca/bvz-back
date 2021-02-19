const mongoose = require('mongoose')

function connect() {
    mongoose.connect('mongodb+srv://BVZ:iCHkmDlW31WMycKr@bvz1.rwmza.mongodb.net/bdbvz?retryWrites=true&w=majority', {
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