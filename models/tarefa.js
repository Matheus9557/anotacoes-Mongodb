const mongoose = require('../database/db');

const tarefaSchema = new mongoose.Schema({
    nome: String,
    conteudo: {type: String, unique: true}
},
{weights:
    {nome:2, conteudo:1}}
    );
const Tarefa = mongoose.model('tarefa', tarefaSchema);

module.exports = {Tarefa};