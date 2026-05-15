require("dotenv").config();

const mysql = require("mysql2");

const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

conexao.connect((erro) => {
  if (erro) {
    console.log("Erro ao conectar:", erro);
    return;
  }

  console.log("Conectado ao MySQL!");
});

module.exports = conexao;