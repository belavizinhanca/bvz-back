const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const AuthRoute = require('./src/routes/auth')
const authenticate = require('./src/middleware/authenticate')

require('./src/models/Mediador')
const Mediador = mongoose.model('mediadores')

require('./src/models/Morador')
const Morador = mongoose.model('moradores')

require('./src/db/connect')

app.use(cors())
app.use(express.json())
app.use('/mediadores', AuthRoute)

app.get('/mediadores', async (req, res) => {
    const mediadoresResponse = await Mediador.find()
    const mediadoresJson = await mediadoresResponse

    return res.json(mediadoresJson)
})

app.put('/mediadores/contato/:id', async (req, res) => {
    const { id } = req.params
    const mediador = await Mediador.findOne({_id: id })

    mediador.contato = req.body.contato,
    mediador.endereco = req.body.endereco

    mediador.save()

    res.json({message: "Cadastro alterado com sucesso.", mediador: Mediador})
})

app.put('/mediadores/login/:id', async (req, res) => {
    const { id } = req.params
    const mediador = await Mediador.findOne({_id: id })

    mediador.email = req.body.email,
    mediador.senha = req.body.senha

    mediador.save()

    res.json({message: "Cadastro alterado com sucesso.", mediador: Mediador})
})

app.delete('/mediadores/:id', async (req, res) => {
    const {id} = req.params
    const mediador = await Mediador.findOneAndDelete({_id: id})

    res.json({message: "Cadastro deletado com sucesso.", mediador: Mediador})
})

app.get('/moradores', async (req, res) => {
    const moradoresResponse = await Morador.find()
    const moradoresJson = await moradoresResponse

    return res.json(moradoresJson)
})

app.post('/moradores', async (req, res) => {
        const novoMorador = new Morador({
            nome: req.body.nome,
            perfil: req.body.perfil,
            demanda: req.body.demanda
        })
        novoMorador.save()
    
        res.json({message: "Cadastrado com sucesso.", morador: novoMorador})
})

app.put('/moradores/:id', async (req, res) => {
    const { id } = req.params
    const morador = await Morador.findOne({_id: id })

    morador.nome = req.body.nome,
    morador.perfil = req.body.perfil,
    morador.demanda = req.body.demanda

    morador.save()

    res.json({message: "Cadastro alterado com sucesso.", morador: Morador})
})

app.delete('/moradores/:id', async (req, res) => {
    const {id} = req.params
    const morador = await Morador.findOneAndDelete({_id: id})

    res.json({message: "Cadastro deletado com sucesso.", morador: Morador})
})

app.listen(process.env.PORT || 3000)