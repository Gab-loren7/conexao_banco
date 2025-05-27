
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


// funcao criada para poder inserir as informações no banco de dados
// async: a palavra-chave async permite usar o await
async function insertCustomer(customer) {

  // estabelece a conexão com o banco de dados pela funcao "connect();" criada anteriormente
  const client = await connect();

  // variavel que carrega as informacoes a serem inseridas no banco de dados com o comando sql necessario
  const sql = "INSERT INTO client (cpf, nome, email, idade, profissao) VALUES (04233286202, Gabriel, gabriel@gmail.com, 17, Estudante);";

  // parametro com as informacoes a serem adicionadas no banco de dados
  // o parametro serve para chamar a area especifica do banco de dados
  const values = [customer.cpf, customer.nome, customer.email, customer.idade, customer.profissao];

  // espera tudo funcionar para enviar as informacoes pelo banco de dados:
  // await: comando usado para operacoes que demoram sem travar o servidor
  // client.quary(variavelRecebendoComandoDeEnvio, objetoRecebendoAsInformacoesEnviadas)
  await client.quary(sql, values);
};


//exporta a funcao insertCostomers para que os outras arquivos possam usar
module.export = {
  insertCustomer
}





