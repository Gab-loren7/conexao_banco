
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

// Rota para listar todos os clientes
app.get('/client', async (req, res) => {
    // Chama a função que seleciona os clientes no banco de dados
    const clientes = await db.selectCustomers();
    // Envia a resposta em formato JSON contendo os clientes
    res.json(clientes);
});

// Rota para inserir clientes app.post("/nomeDoBanco", async (parametroRequerimento, parametroResposta) => { . . . });
app.post("/client", async (req, res) => {

    // espera o requerimento (as informacoes a serem postadas) do db.insertCustomer (chama a funcao insertCustomer do db.js)
    await db.insertCustomer(req.body)

    // responder com 201 (o status HTTP 201 indica que o recurso foi criado corretamente.) quando der certo
    res.sendStatus(201)
});

// Define a rota DELETE para deletar um cliente pelo CPF recebido na URL
app.delete('/client/:cpf', async (req, res) => {
    try {
        // Pega o valor do CPF enviado como parâmetro na URL
        const cpf = req.params.cpf;

        // Chama a função "deleteCustomer" do módulo db.js para deletar o cliente do banco
        await db.deleteCustomer(cpf);

        // Se der tudo certo, envia resposta de sucesso com mensagem personalizada
        res.status(200).send(`Cliente com CPF ${cpf} deletado com sucesso.`);
    } catch (err) {
        // Se ocorrer algum erro, exibe o erro no console
        console.error(err);

        // E envia uma resposta de erro (status 500) para o cliente
        res.status(500).send('Erro ao deletar cliente.');
    }
});

// permite que o browser possa acessar as informacoes atribuidas a essa porta
app.listen(port);

console.log("Backend Rodando!")

