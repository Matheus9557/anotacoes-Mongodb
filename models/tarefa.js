const mongoose = require('../database/db');

const tarefaSchema = new mongoose.Schema({
    nome: {type: String, unique: true},
    conteudo: String,
    
}
 );

const Tarefa = mongoose.model('tarefa', tarefaSchema);

module.exports = Tarefa;