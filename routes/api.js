require('dotenv').config();

const express = require ('express');
const router = express.Router();

const loginController = require('../controllers/login');
const tarefaController = require("../controllers/TarefaController");


router.get('/', tarefaController.getTarefas);

router.get('/buscar/:nome', tarefaController.buscarTarefa);

router.post('/pessoas', tarefaController.addPessoa);

router.get('/pessoas', tarefaController.getPessoas);

router.post('/login', loginController.createSession);

router.post('/addtarefas', tarefaController.addTarefa);

router.post('/postar', tarefaController.addPostagem);

router.get('/postagens', tarefaController.getPostagens);

router.delete('/deletar/:nome', tarefaController.deletarTarefa);

router.post('/editar', tarefaController.atualizarTarefa);

module.exports = router;