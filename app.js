const express = require('express')
const app = express()
const cors = require('cors')
const AuthRoute = require('./src/routes/auth')
const authenticate = require('./src/middleware/authenticate')
const Moradores = require('./src/routes/moradores')
const Mediadores = require('./src/routes/mediadores')


require('./src/db/connect')

app.use(cors())
app.use(express.json())
app.use('/api', AuthRoute)
app.use('/moradores', Moradores)
app.use('/mediadores', Mediadores)



app.listen(process.env.PORT || 4000)