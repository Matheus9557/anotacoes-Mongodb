require('dotenv').config();
const express = require('express');
const Tarefa = require('./models/tarefa');
const Pessoa = require('./models/pessoa');
const router = require('./routes/api');
const session = require('express-session');
const app = express();
const neo4j = require('./database/neo4j');
const cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');

app.use(express.json());
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'views')));
app.use(cors());



app.use('/api', router);


app.get('/', function (req, res){
    Tarefa.find().exec((err, tarefas) => {
        if (err) {
            return next(err);
        };
        res.render("../views/home", { tarefas: tarefas });
    });
});

app.get('/api/addtarefas', function (req, res){
    res.render("../views/addTarefas");
});

app.get('/api/addpessoa', function (res, res){
    res.render("../views/addPessoa");
});

app.post('/api/addpessoa', function(req, res, next){
    const nome = req.body.nome;
    const email = req.body.email;
    const password = req.body.password;

    Pessoa.findOne({ email: email }, function(err, pessoa){
        if(err){
            return next(err);
        }
        if(pessoa){
            req.flash("error", "Pessoa já cadastrada");
            return res.redirect('/api/addpessoa');
        }

        const newPessoa = new Pessoa({
            nome: nome,
            email: email,
            password: password,
        });
        newPessoa.save(next);
    });
});

app.get('/api/login', function(req, res){
    res.render("../views/login");
});

  
app.post('/api/login', function(req, res){
    const session = req.session;
    const { email, password } = req.body;

    session.email = email;
    session.password = password;

    res.end("sucess");
});

app.post('/api/addtarefas', function (req, res, next){
    const nome = req.body.nome;
    const conteudo = req.body.conteudo;

    Tarefa.findOne({nome: nome }, function (err, tarefa){
        if(err) {
            return next(err);
        }
        if(tarefa) {
            req.flash("error", "Tarefa já existe");
            return res.redirect('/api/addtarefas');
        }

        const newTarefa = new Tarefa({
            nome: nome,
            conteudo: conteudo,
        });
        newTarefa.save(next);
    });
});

app.post('/api/postar', async function(req, res){
    const session = neo4j.session();
    const result = await session.run(`MATCH (p1:Pessoa{email:"${request.body.email1}"}) OPTIONAL MATCH (p2:Tarefa{nome:"${request.body.nome}"}) CREATE (p1)-[:CRIOU]->(p2)`);
    if(result.summary.counters._stats.relationshipsCreated > 0){
        response.status(200).send('Relacionamento criado');
    }else{
        response.status(400).send('Relacionamento não criado');
    };
    await session.close();
});


app.get('/api/deletar/:nome', function(req, res){
   Tarefa.findOneAndDelete(req.params.nome, function(err){
    if(err){
        console.log("err");
    }else{
        res.redirect("/");
    };
   });
});

app.get('/api/editar', function(req, res,){
    res.render("../views/editar");
})

app.post('/api/editar', function(req, res, next){
    const nome = req.body.nome
    const conteudo = req.body.conteudo
    Tarefa.updateOne({nome: req.body.nome}, {$set:{conteudo: req.body.conteudo}}, function(err, tarefa){
        if(err) {
            return next(err);
        }
        if(tarefa) {
            req.flash("error", "Tarefa já existe");
            return res.redirect('/');
        }

        const newTarefa = new Tarefa({
            nome: nome,
            conteudo: conteudo,
        });
        newTarefa.save(next);
    });
    res.redirect("/");

});
app.listen(process.env.API_PORT, ()=>{
  console.log(`API rodando na porta ${process.env.API_PORT}`);
});