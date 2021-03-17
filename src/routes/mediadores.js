const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')


require('../models/Mediador')
const Mediador = mongoose.model('mediadores')


router.get('/list', async (req, res) => {
    const mediadoresList = await Mediador.find();
    const mediadoresJson = await mediadoresList;

    return res.json(mediadoresJson);
})  

router.put('/contato/:id', async (req, res) => {
    const { id } = req.params
    const mediador = await Mediador.findOne({_id: id })

    mediador.contato = req.body.contato,
    mediador.endereco = req.body.endereco

    mediador.save()

    res.json({message: "Cadastro alterado com sucesso.", mediador: Mediador})
})

router.put('/login/:id', async (req, res) => {
    const { id } = req.params
    const mediador = await Mediador.findOne({_id: id })

    mediador.email = req.body.email,
    mediador.senha = req.body.senha

    mediador.save()

    res.json({message: "Cadastro alterado com sucesso.", mediador: Mediador})
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const mediador = await Mediador.findOneAndDelete({_id: id})

    res.json({message: "Cadastro deletado com sucesso.", mediador: Mediador})
})

module.exports = router;
