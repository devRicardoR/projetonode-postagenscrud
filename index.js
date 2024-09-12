const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser")
const Post = require("./models/Post")

//Config
    //Template Engine
    app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');

    //body Parser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())


//Rotas

    app.get("/", function(req, res){
        Post.findAll().then(function(posts){
            // Extrair dataValues de cada post
            const plainPosts = posts.map(post => post.dataValues);
            res.render("home", {posts: plainPosts});
        });
    });

    app.get("/cad", function(req, res){ //Criando uma rota /cad
        res.render("formulario") //renderizando meu arquivo formulario
    });

    app.post("/add", function(req, res){ //criando uma rota /add
        Post.create({ 
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){ //se der tudo certo 
            res.redirect("/") //ele redireciona para rota "/"
        }).catch(function(erro){ //se der errado
            res.send("Houve algum erro: " + erro) //ele apresenta um erro
        });
    });
    
    app.get("/deletar/:id", function(req, res){ //criando uma rota para deletar dados
        Post.destroy({where: {"id": req.params.id}}).then(function(){
            res.send("Postagem delatada com sucesso!")
        }).catch(function(erro){
            res.send("Esta postagem não existe!")
        })
    }); //para deletar utilizamos o id do dados, todo dado tem um id no banco de dados, ou seja o id passado na rota vai ser deletado

app.listen(8081, function(){
    console.log("Servidor rodando na URL http://localhost:8081");
});