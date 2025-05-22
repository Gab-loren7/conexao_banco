require("dotenv").config();

const db = require("./db");

const port = process.env.PORT;

const express = require('express');

const app = express();

app.use(express.json());

app.post("/client", async (req, res) => {
    await db.insertCustomers(req.body);
    // Receber a resposta da opareção realizada
    res.sendStatus(201)
});

app.listen(port);

console.log("Backend Rodando!")