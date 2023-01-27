require('dotenv').config();
const express = require('express');
const Tarefa = require('./models/tarefa');
const router = require('./routes/api');
const app = express();
var bodyParser = require('body-parser');
var path = require('path');



app.use(express.json());
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'views')));



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

})

app.get('/api/pesquisar', function (req,res)   {
    res.render("../views/pesquisar")
    
    
})


    
 app.listen(process.env.API_PORT, ()=>{
    console.log(`API rodando na porta ${process.env.API_PORT}`);
});
