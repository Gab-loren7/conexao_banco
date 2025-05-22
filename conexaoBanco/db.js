// const { Pool } = require("pg");

async function connect() {
  const { Pool } = require("pg");

  if (global.connection)
    return global.connection.connect();

  const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    port: process.env.PORT_NUMBER
  });

  const client = await pool.connect();
  console.log("O Pool de conexão foi criado com sucesso!")
  client.release();

  global.connection = pool;

  return pool.connect();
}

connect();


// Função para inserir clientes
async function insertCustomers(customer) {
  // Estabelecer conexão
  const client = await connect();
  // query
  const sql = "INSERT INTO client (cpf, nome, email, idade, profissao) VALUES ($1, $2, $3, $4, $5);";

  // parâmetros injetados na consulta
  const values = [customer.cpf, customer.nome, customer.email, customer.idade, customer.profissao];

  await client.query(sql, values);
};

module.exports = {
  insertCustomers
}

