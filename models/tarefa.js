const mongoose = require('../database/db');

const tarefaSchema = new mongoose.Schema({
    nome: {type: String, unique: true},
    conteudo: String,
    
},
{ 
    weights: {
    nome : 1,
    conteudo: 2
  }
}
 );

const Tarefa = mongoose.model('tarefa', tarefaSchema);

module.exports = Tarefa;