const express = require("express");
const conexao = require("./database/conexao");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

app.get("/clientes", (req, res) => {
  const sql = "SELECT * FROM clientes";

  conexao.query(sql, (erro, resultados) => {
    if (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "Erro ao buscar clientes"
      });
    }

    res.json(resultados);
  });
});

app.get("/servicos", (req, res) => {
  const sql = "SELECT * FROM servicos";

  conexao.query(sql, (erro, resultados) => {
    if (erro) {
      console.log(erro);

      return res.status(500).json({
        erro: "Erro ao buscar serviços"
      });
    }

    res.json(resultados);
  });
});

app.get("/agendamentos", (req, res) => {
  const sql = `
    SELECT 
      agendamentos.id,
      clientes.nome AS cliente,
      servicos.nome AS servico,
      data_agendamento
    FROM agendamentos
    JOIN clientes ON agendamentos.cliente_id = clientes.id
    JOIN servicos ON agendamentos.servico_id = servicos.id
  `;

  conexao.query(sql, (erro, resultados) => {
    if (erro) {
      console.log(erro);

      return res.status(500).json({
        erro: "Erro ao buscar agendamentos"
      });
    }

    res.json(resultados);
  });
});

module.exports = app;

app.post("/clientes", (req, res) => {
  const { nome, telefone } = req.body;

  const sql = `
    INSERT INTO clientes (nome, telefone)
    VALUES (?, ?)
  `;

  conexao.query(sql, [nome, telefone], (erro, resultado) => {
    if (erro) {
      console.log(erro);

      return res.status(500).json({
        erro: "Erro ao cadastrar cliente"
      });
    }

    res.status(201).json({
      mensagem: "Cliente cadastrado com sucesso!",
      id: resultado.insertId
    });
  });
});

app.post("/servicos", (req, res) => {
  const { nome, preco } = req.body;

  const sql = `
    INSERT INTO servicos (nome, preco)
    VALUES (?, ?)
  `;

  conexao.query(sql, [nome, preco], (erro, resultado) => {
    if (erro) {
      console.log(erro);

      return res.status(500).json({
        erro: "Erro ao cadastrar serviço"
      });
    }

    res.status(201).json({
      mensagem: "Serviço cadastrado com sucesso!",
      id: resultado.insertId
    });
  });
});

app.post("/agendamentos", (req, res) => {
  const {
    cliente_id,
    servico_id,
    data_agendamento
  } = req.body;

  const sql = `
    INSERT INTO agendamentos
    (cliente_id, servico_id, data_agendamento)
    VALUES (?, ?, ?)
  `;

  conexao.query(
    sql,
    [cliente_id, servico_id, data_agendamento],
    (erro, resultado) => {
      if (erro) {
        console.log(erro);

        return res.status(500).json({
          erro: "Erro ao criar agendamento"
        });
      }

      res.status(201).json({
        mensagem: "Agendamento criado com sucesso!",
        id: resultado.insertId
      });
    }
  );
});