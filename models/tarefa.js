const mongoose = require('../database/db');

const tarefaSchema = new mongoose.Schema({
    nome: {type: String, unique: true},
    conteudo: String,
    
},
{ 
    weights: {
    nome : 10,
    conteudo: 20
  }
}
 );

const Tarefa = mongoose.model('tarefa', tarefaSchema);

module.exports = Tarefa;