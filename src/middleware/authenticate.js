const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'AZQYW(10)')

        req.mediador = decode
        next()
    }
    catch(error) {
        res.json({
            message: 'Autenticação falhou!'
        })
    }
}

module.exports = authenticate