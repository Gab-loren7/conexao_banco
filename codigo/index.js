
// puxando as configuracoes da biblioteca "dotenv"
require("dotenv").config(); 

// importando o arquivo "db.js"
const db = require("./db");

// pegando a porta do banco de dados
const port = process.env.PORT;

// atribuindo a biblioteca "express" a variavel "express"
const express = require('express');

// atribuindo o "express" no "app" para separar e deixar organizado
const app = express();

// usando a variavel "app" para usar o caminho e a variavel "express" para dizer que as informacoes serao mandadas em JSON
app.use(express.json());

// Rota para inserir clientes app.post("/nomeDoBanco", async (parametroRequerimento, parametroResposta) => { . . . });
app.post("/client", async (req, res) => {

    // espera o requerimento (as informacoes a serem postadas) do db.insertCustomer (chama a funcao insertCustomer do db.js)
    await db.insertCustomer(req.body)

    // responder com 201 (o status HTTP 201 indica que o recurso foi criado corretamente.) quando der certo
    res.sendStatus(201)
});

// permite que o browser possa acessar as informacoes atribuidas a essa porta
app.listen(port);

console.log("Backend Rodando!")