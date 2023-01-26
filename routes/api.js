require('dotenv').config();

const express = require ('express');
const router = express.Router();

const tarefaController = require("../controllers/TarefaController");
const Tarefa = require('../models/tarefa');

router.get('/', tarefaController.getTarefas);

router.get('/buscar/:nome', tarefaController.buscarTarefa);

router.post('/addtarefas', tarefaController.addTarefa);

router.delete('/deletar/:nome', tarefaController.deletarTarefa);

router.post('/editar', tarefaController.atualizarTarefa);

module.exports = router;