const { response } = require('express');
const { find } = require('../models/pessoa');
const Tarefa = require('../models/tarefa');
const Pessoa = require('../models/pessoa');
const neo4j = require('../database/neo4j');

const buscarTarefa = async (request, response) =>{
    const tarefas = await Tarefa.find({nome: request.params.nome},{__v:false});
    if(tarefas.length > 0){
        response.status(200).send(tarefas);
    }else{response.status(400).send('Tarefa não encontrada')};
};


const addPessoa = async (request, response) =>{
    const pessoa = new Pessoa(request.body);
    pessoa.save().then(async()=>{
        
        const session = neo4j.session();
        await session.run(`CREATE (:Pessoa{email:"${request.body.email}"}, {password:"${request.body.password}"}, {nome:"${request.body.nome}"})`);
        await session.close();

        response.status(200).send('Salvo com sucesso');
    }).catch(err=>{
        response.status(400).send('Falha ao salvar');
    });
};



const getPessoas = async (request, response)=>{
    const pessoas = await Pessoa.find({},{_id: false, nome:true, email:true});
    response.status(200).send(pessoas);
};


const addPostagem = async(request, response)=>{
    const session = neo4j.session();
    const result = await session.run(`MATCH (p1:Pessoa{email:"${request.body.email1}"}) OPTIONAL MATCH (p2:Tarefa{nome:"${request.body.nome}"}) CREATE (p1)-[:CRIOU]->(p2)`);
    if(result.summary.counters._stats.relationshipsCreated > 0){
        response.status(200).send('Relacionamento criado');
    }else{
        response.status(400).send('Relacionamento não criado');
    };
    await session.close();
};

const getPostagens = async(request, response)=>{
    const session = neo4j.session();
    const result = await session.run(`MATCH (:Pessoa{email:"${request.params.email}"})-[CRIOU]->(p2:Tarefa) RETURN p2.nome`);
    result.records.forEach(r =>{
        console.log(r._fields[0]);
    });
    session.close();
};

const getTarefas = async (request, response)=>{
    const tarefas = await Tarefa.find({},{_id:false, nome:true, conteudo:true});
    response.status(200).send(tarefas);
};

const addTarefa = async (request, response) =>{
    const tarefa = new Tarefa(request.body);
    tarefa.save().then(async()=>{
        
        const session = neo4j.session();
        await session.run(`CREATE(:Tarefa{nome:"${request.body.nome}"}, {conteudo:"${request.body.conteudo}"})`);
        await session.close();

        response.status(200).send('Salvo com sucesso');
    }).catch(err=>{
        response.status(400).send('Falha ao salvar');
    });

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


module.exports = {getTarefas, addTarefa, deletarTarefa, atualizarTarefa, buscarTarefa, addPessoa, addPostagem, getPostagens, getPessoas};