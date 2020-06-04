const express = require("express");
const server = express();

//configurar pasta publica
// com esta configuração não é precisa mudar a referencia dos arquivos css dentro do html
server.use(express.static("public"));


//utilizando template engine nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src/views",{
    express: server,
    noCache: true,
});

server.get("/", (req, res) =>{
    //res.sendFile(__dirname + "/views/index.html"); metodo para renderizar apenas o html
   return res.render("index.html"); // metodo para renderizar com o nunjucks
});

server.get("/create-point", (req, res) =>{
    //res.sendFile(__dirname + "/views/create-point.html");
    return res.render("create-point.html");
});

server.get("/search", (req, res) =>{
    //res.sendFile(__dirname + "/views/create-point.html");
    return res.render("search-results.html");
});

server.listen(3001);