const express = require("express");
const server = express();

//pegar o banco de dados
const db = require('./database/db');

//configurar pasta publica
// com esta configuração não é precisa mudar a referencia dos arquivos css dentro do html
server.use(express.static("public"));

//habilisar o uso do req.body na nossa aplicação

server.use(express.urlencoded({ extended: true}));


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
    //req.query pega os dados vindo atraves da url
    

    return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
    //req.body pega os dados vindo do formulario ou metodo post 

    //inserir dados no banco de dados
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`
    let {name, image, address, address2,state, city, items} = req.body; 
    const values = [
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ]
    function afterInsertData(err){
        if(err){
            console.log(err);
            return res.send("Erro no cadastro!!!");
        }
        console.log("Cadastrado com sucesso!");
        console.log(this)

        return res.render("create-point.html", {saved: true});
    }

    db.run(query, values, afterInsertData)
});

server.get("/search", (req, res) =>{
    //res.sendFile(__dirname + "/views/create-point.html");
    const search = req.query.search;

    if( search === ""){
        return res.render("search-results.html",{total : 0});
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err);
        }
        console.log("Aqui estão seus registros: ");
        console.log(rows);

        const total = rows.length;
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html",{places: rows, total});
    });
    
});

server.listen(3002);