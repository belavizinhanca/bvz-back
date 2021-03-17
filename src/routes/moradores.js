const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')


require('../models/Morador')
const Morador = mongoose.model('moradores')

//CRUD das demandas

router.get('/', async (req, res) => {
    const moradoresResponse = await Morador.find()
    const moradoresJson = await moradoresResponse

    return res.json(moradoresJson)
})

router.post('/', async (req, res) => {
        const novoMorador = new Morador({
            nome: req.body.nome,
            perfil: req.body.perfil,
            demanda: req.body.demanda
        })
        novoMorador.save()
    
        res.json({message: "Cadastrado com sucesso.", morador: novoMorador})
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const morador = await Morador.findOne({_id: id })

    morador.nome = req.body.nome,
    morador.perfil = req.body.perfil,
    morador.demanda = req.body.demanda

    morador.save()

    res.json({message: "Cadastro alterado com sucesso.", morador: Morador})
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const morador = await Morador.findOneAndDelete({_id: id})

    res.json({message: "Cadastro deletado com sucesso.", morador: Morador})
})


module.exports = router;