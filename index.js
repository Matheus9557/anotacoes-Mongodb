require('dotenv').config();
const express = require('express');
const Pessoa = require('./models/pessoa');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


const router = require('./routes/api');
app.use('/api', router);


app.get('/', function (req, res){
    Pessoa.find().sort({nome: "descending"}).exec(function(err, pessoas){
        if (err){
            return next(err);
        };
        res.render("../views/home", {pessoas: pessoas});
    });
});

app.get('/api/addpessoas', function (req, res){
    res.render("../views/addPessoa");
});

app.post('/api/addpessoas', function (req, res, next){
    const nome = req.body.nome;
    const email = req.body.email;

    Pessoa.findOne({nome: nome }, function (err, pessoa){
        if(err) {
            return next(err);
        }
        if(pessoa) {
            req.flash("error", "Usuario já existe");
            return res.redirect('/api/addpessoas');
        }

        const newPessoa = new Pessoa({
            nome: nome,
            email: email,
        });
        newPessoa.save(next);
    });
});

app.get('/api/deletar/:email', function(req, res){
   Pessoa.findOneAndDelete(req.params.email, function(err){
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
    const email = req.body.email
    Pessoa.updateOne({email: request.body.email}, {$set:{nome: request.body.nome}}, function(err, pessoa){
        if(err) {
            return next(err);
        }
        if(pessoa) {
            req.flash("error", "Usuario já existe");
            return res.redirect('/');
        }

        const newPessoa = new Pessoa({
            nome: nome,
            email: email,
        });
        newPessoa.save(next);
    });
    res.redirect("/");

})


app.listen(process.env.API_PORT, ()=>{
    console.log(`API rodando na porta ${process.env.API_PORT}`);
});

