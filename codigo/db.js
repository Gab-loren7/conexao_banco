
// funcao que cria uma conexão com o banco de dados
async function connect() {

  // variavel que esta puxando o exato elemento "pool" da biblioteca "pg express dotenv nodemon"
  // para puxar um elemento especifico tem q ser dentro de chaves!!
  // o elemento "pool" e responsavel pela distribucao equilibrada dos recursos do banco de dados
  const { Pool } = require("pg");


  // analisando se esta tend uma conexao global
  // o elemento "global.connection" vem da biblioteca "pg express dotenv nodemon" e estabelece uma conexao global
  if (global.connection)

    // retornando a conexao global da funcao "connect();"
    // o elemento "global.connection.connect();" esta retornando um elemento especifico da funcao "connect();"
    // return elementoEspecifico.nomeDaFuncao();
    return global.connection.connect();

  // objeto que recebe as informações do banco de dados sem mostrar para as pessoas diretamente do arquivo ".env"
  // o elemento process vem da biblioteca "pg express dotenv nodemon" é usado para interagir com elementos definidos em um arquivo ".env"
  // process.nomeDoArquivo.nomeDoElementoDesejado
  const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    port: process.env.PORT_NUMBER
  });

  // variavel que esta esperando o "pool" da funcao "connect();" ser preenchido
  const client = await pool.connect();
  console.log("O Pool de conexão foi criado com sucesso!");

  // esse comando esta "liberando" a variavel "client"
  // o elemento ".release();" e responsabel por liberar um elemento que nao esta sendo usado para outros funcionamentos usarem
  // elementoEspecifico.release();
  client.release();

  // estabelecendo uma conexao global para o objeto "pool"
  global.connection = pool;

  //retornando o objeto exato "pool"
  return pool.connect();
};

connect();

// Função para listar um cliente
async function selectCustomer(id) {
  // Estabelece a conexão com o banco de dados
  const client = await connect();
  // Executa a query SQL usando declaração preparada para evitar SQL Injection
  const res = await client.query("SELECT * FROM client WHERE cpf=$1", [id]);
  // Retorna as linhas (dados do cliente)
  return res.rows;
}

// Função para inserir clientes no banco de dados. Essa função recebe informações vindos da rota POST.
async function insertCustomer(customer) {
  // Estabelecer conexão com o banco de dados (a função "connect" deve ser definida em outro lugar)
  const client = await connect();
  // Prepara a query SQL de inserção com parâmetros para evitar SQL Injection
  const sql = "INSERT INTO client (cpf, nome, email, idade, profissao) VALUES ($1, $2, $3, $4, $5)";
  // Cria um array com os valores que serão injetados na query, na ordem correta
  const values = [customer.cpf, customer.nome, customer.email, customer.idade, customer.profissao];
  // Executa a query no banco de dados para inserir o cliente
  await client.query(sql, values);
}

// Função assíncrona para deletar cliente por CPF
async function deleteCustomer(cpf) {
  // Conecta ao banco de dados usando a função "connect" definida anteriormente
  const client = await connect();
  // Cria a query SQL para deletar um cliente com base no CPF fornecido
  // O "$1" é um placeholder para prevenir SQL Injection
  const sql = "DELETE FROM client WHERE cpf = $1";
  // Executa a query no banco de dados, passando o CPF como valor para o placeholder "$1"
  // Isso remove o cliente que tiver esse CPF
  await client.query(sql, [cpf]);
}

// Exporta a função para que ela possa ser usada em outras partes do backend
module.exports = {
  insertCustomer,
  selectCustomer,
  deleteCustomer
};