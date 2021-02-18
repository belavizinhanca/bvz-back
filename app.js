const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

require('./src/models/Mediador')
const Mediador = mongoose.model('mediadores')

require('./src/models/Morador')
const Morador = mongoose.model('moradores')

require('./src/db/connect')

app.use(express.json())

app.get('/mediadores', async (req, res) => {
    const mediadoresResponse = await Mediador.find()
    const mediadoresJson = await mediadoresResponse

    return res.json(mediadoresJson)
})

app.post('/mediadores', async (req, res) => {
    const validate = await Mediador.findOne({email:req.body.email})
    if(validate) {
        return res.json({message: "E-mail já cadastrado."})
    } else {
        const novoMediador = new Mediador({
            nome: req.body.nome,
            email: req.body.email,
            contato: req.body.contato,
            endereco: req.body.endereco,
            senha: req.body.senha,
        })

        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(novoMediador.senha, salt, (error, hash) => {
                if(error) {
                    res.json({message: "Erro ao cadastrar."})
                } else {
                    novoMediador.senha = hash
                    novoMediador.save()
    
                    res.json({message: "Cadastrado com sucesso.", mediador: novoMediador})   
                }
            })
        })
    }
})

app.put('/mediadores/:id', async (req, res) => {
    const { id } = req.params
    const mediador = await Mediador.findOne({_id: id })

    mediador.nome = req.body.nome,
    mediador.email = req.body.email,
    mediador.contato = req.body.contato,
    mediador.endereco = req.body.endereco,
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
            perfil: req.body.perfil
        })
        novoMorador.save()
    
        res.json({message: "Cadastrado com sucesso.", morador: novoMorador})
})

app.put('/moradores/:id', async (req, res) => {
    const { id } = req.params
    const morador = await Morador.findOne({_id: id })

    morador.nome = req.body.nome,
    morador.perfil = req.body.perfil

    morador.save()

    res.json({message: "Cadastro alterado com sucesso.", morador: Morador})
})

app.delete('/moradores/:id', async (req, res) => {
    const {id} = req.params
    const morador = await Morador.findOneAndDelete({_id: id})

    res.json({message: "Cadastro deletado com sucesso.", morador: Morador})
})

app.listen(process.env.PORT || 3000)