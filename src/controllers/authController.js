const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

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

const login = async (req, res, next) => {

    const email = req.body.username;
    const senha = req.body.password;    
    const contato = req.body.contato;
   console.log(email, senha);

    if(email === undefined || senha === undefined){
        return res.json({message:"Senha ou usuário inválido !"})
    } else {

    const consultaLogin = await Mediador.findOne({$or: [{email},{contato}]}, (err, result) => {
        

        if(!err && result !== null) {
            // return res.json({message: "Usuario Encontrado", senha: result.senha})
            var verSenha = bcrypt.compareSync(senha, result.senha);
            // return res.json({verSenha})
            
            if(!verSenha){
                return res.json({message: "Senha incorreta!"})
            }else {
                let token = jwt.sign({nome: result.nome}, config.JWT_KEY, {expiresIn: '1m'})
                return res.json({
                    success: true,
                    nome:result.nome,
                    message: 'Login efetuado com sucesso!',
                    token
                })
                // return res.json({message: "Senha Correta! "})
            }
        }
        else {
                res.json({ message: 'Usuário não encontrado!' })
            }
        })}
    }

const verifyToken = async (req, res, next) => {

    var token = req.headers.auth.split(' ')[1]


    
    var token = req.headers['auth'].split(' ')[1];
    
    jwt.verify(token, config.JWT_KEY, (err, decode) => {

        if(!err){
            res.json({success: true, decode})
        }else {
            res.json({
                success: false
            })
        }
    })
}

    

module.exports = {
    register, login, verifyToken
}