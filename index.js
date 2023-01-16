require('dotenv').config();
const express = require('express');
const Tarefa = require('./models/tarefa');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


const router = require('./routes/api');
app.use('/api', router);


app.get('/', function (req, res){
    Tarefa.find().sort({nome: "descending"}).exec(function(err, tarefas){
        if (err){
            return next(err);
        };
        res.render("../views/home", {tarefas: tarefas});
    });
});

app.get('/api/addtarefas', function (req, res){
    res.render("../views/addTarefas");
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
    Tarefa.updateOne({nome: request.body.nome}, {$set:{conteudo: request.body.conteudo}}, function(err, tarefa){
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

})


app.listen(process.env.API_PORT, ()=>{
    console.log(`API rodando na porta ${process.env.API_PORT}`);
});

