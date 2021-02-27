const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('../models/Mediador')
const Mediador = mongoose.model('mediadores')

const register = async (req, res, next) => {
    const validate = await Mediador.findOne({email:req.body.email})
    if(validate) {
        return res.json({message: "E-mail já cadastrado."})
    } else {
    bcrypt.hash(req.body.senha, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error: err
            })
        }

        let mediador = new Mediador ({
            nome: req.body.nome,
            email: req.body.email,
            contato: req.body.contato,
            endereco: req.body.endereco,
            senha: hashedPass
        })
        mediador.save()
        .then(mediador => {
            res.json({
                message: 'Cadastro efetuado com sucesso'
            })
        })
        .catch(error => {
            res.json({
                message: 'Erro ao cadastrar'
            })
        })
    })
}}

const login = (req, res, next) => {
    var username = req.body.username
    var senha = req.body.senha

    Mediador.findOne({$or: [{email:username},{contato:username}]})
    .then(mediador => {
        if(mediador){
            bcrypt.compare(senha, mediador.senha, function(err, result){
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({nome: mediador.nome}, 'AZQYW(10)', {expiresIn: '1h'})
                    res.json({
                        message: 'Login efetuado com sucesso!',
                        token
                    })
                }else{
                    res.json({
                        message: 'Senha incorreta!'
                    })
                }
            })
        }else{
            res.json({
                message: 'Usuário não encontrado!'
            })
        }
    })
}

module.exports = {
    register, login
}