const { response } = require('express');
const Tarefa = require('../models/tarefa');

const buscarTarefa = async (request, response) =>{
    const tarefas = await Tarefa.find({nome: request.params.nome},{__v:false});
    if(tarefas.length > 0){
        response.status(200).send(tarefas);
    }else{response.status(400).send('Tarefa não encontrada')};
};
    
const getTarefas = async (request, response)=>{
    const tarefas = await Tarefa.find({},{_id:false, nome:true, conteudo:true});
    response.status(200).send(tarefas);
};

const addTarefa = async (request, response) =>{
    const tarefa = new Tarefa(request.body);
    tarefa.save().then(()=>{
        response.status(200).send('Salvo com sucesso!');
    }).catch(err=>{
        response.status(400).send('Falha ao Salvar');
    })

};

const deletarTarefa = async (request, response)=>{
    const result = await Tarefa.deleteOne({nome: request.params.nome});
    if(result.deletedCount > 0){
        response.status(200).send('Removido com sucesso!');
    }else{
        response.status(400).send('Tarefa não encontrada');
    }

};

const atualizarTarefa = async(request, response)=>{
    const result = await Tarefa.updateOne({nome: request.body.nome},{$set:{conteudo: request.body.conteudo}});

    if(result.modifiedCount > 0){
        response.status(200).send('Atualizado com sucesso!');
    }else{
        response.status(400).send('Tarefa não encontrada!');
    }
}

const buscarTarefaPeso = async (request, response) => {
    const result = await Tarefa.find({ $text: { $search:request.body.nome } }, { score: { $meta: 'textScore'} })
    if(result.length > 0){
        response.status(200).send(result);
    }else{response.status(400).send('')};
}
//db.posts.find({ $text: { $search: 'nodejs' } }, { score: { $meta: 'textScore'} })

module.exports = {getTarefas, addTarefa, deletarTarefa, atualizarTarefa, buscarTarefa, buscarTarefaPeso};