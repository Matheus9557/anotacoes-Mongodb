require('dotenv').config();

const express = require ('express');
const router = express.Router();

const pessoaController = require("../controllers/PessoaController");
const Pessoa = require('../models/pessoa');

router.get('/pessoas', pessoaController.getPessoas);

router.get('/buscar/:email', pessoaController.buscarPessoa);

router.post('/addpessoas', pessoaController.addPessoa);

router.delete('/deletar/:email', pessoaController.deletarPessoa);

router.post('/editar', pessoaController.atualizarPessoa);

module.exports = router;