const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const conexao = require("./database/conexao");

app.get("/", (req, res) => {
    res.send("Backend funcionando!");
});

// BARBEIROS
app.post("/login", (req, res) => {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }

    const sql = "SELECT * FROM barbeiros WHERE nome = ? AND senha = ?";

    conexao.query(sql, [nome, senha], (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro no login" });
        }

        if (results.length === 0) {
            return res.status(401).json({ erro: "Usuário ou senha inválidos" });
        }

        res.json({
            mensagem: "Login realizado com sucesso!",
            usuario: results[0]
        });
    });
});

app.post("/barbeiros", (req, res) => {
    const { nome, senha } = req.body;

    const sql = "INSERT INTO barbeiros (nome, senha) VALUES (?, ?)";

    conexao.query(sql, [nome, senha], (err) => {

        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ erro: "Usuário já existe" });
            }

            return res.status(500).json({ erro: "Erro ao criar usuário" });
        }

        res.json({ mensagem: "Conta criada com sucesso!" });
    });
});

app.get("/barbeiros", (req, res) => {

    const sql = "SELECT id, nome FROM barbeiros";

    conexao.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao buscar barbeiros" });
        }

        res.json(results);
    });
});

// CLIENTE
app.get("/clientes", (req, res) => {

    const sql = "SELECT * FROM clientes";

    conexao.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao buscar clientes" });
        }

        res.json(results);
    });
});

app.post("/clientes", (req, res) => {

    const { nome, telefone } = req.body;

    if (!nome || !telefone) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }

    const sql = "INSERT INTO clientes (nome, telefone) VALUES (?, ?)";

    conexao.query(sql, [nome, telefone], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao inserir cliente" });
        }

        res.json({
            mensagem: "Cliente cadastrado com sucesso!"
        });
    });
});

app.put("/clientes/:id", (req, res) => {

    const { id } = req.params;
    const { nome, telefone } = req.body;

    if (!nome || !telefone) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }

    const sql = "UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?";

    conexao.query(sql, [nome, telefone, id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao atualizar cliente" });
        }

        res.json({ mensagem: "Cliente atualizado com sucesso!" });
    });
});

app.delete("/clientes/:id", (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM clientes WHERE id = ?";

    conexao.query(sql, [id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao deletar cliente" });
        }

        res.json({ mensagem: "Cliente removido com sucesso!" });
    });
});


//SERVIÇO  
app.get("/servicos", (req, res) => {
    const sql = "SELECT * FROM servicos";

    conexao.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao buscar serviços" });
        }

        res.json(results);
    });
});

//SERVICO
app.put("/servicos/:id", (req, res) => {

    const { id } = req.params;
    const { nome, preco } = req.body;
    const sql = "UPDATE servicos SET nome = ?, preco = ? WHERE id = ?";

    conexao.query(sql, [nome, preco, id], (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao atualizar serviço" });
        }

        res.json({ mensagem: "Serviço atualizado com sucesso!" });
    });
});

app.post("/servicos", (req, res) => {
    const { nome, preco } = req.body;

    if (!nome || !preco) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }

    const sql = "INSERT INTO servicos (nome, preco) VALUES (?, ?)";

    conexao.query(sql, [nome, preco], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao inserir serviço" });
        }

        res.json({ mensagem: "Serviço cadastrado com sucesso!" });
    });
});

app.delete("/servicos/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM servicos WHERE id = ?";

    conexao.query(sql, [id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao deletar serviço" });
        }

        res.json({ mensagem: "Serviço removido com sucesso!" });
    });
});

// AGENDAMENTO
app.get("/agendamentos", (req, res) => {

    const sql = `
        SELECT 
            a.id,
            a.data_agendamento,
            c.nome AS cliente_nome,
            s.nome AS servico_nome,
            s.preco
        FROM agendamentos a
        JOIN clientes c ON a.cliente_id = c.id
        JOIN servicos s ON a.servico_id = s.id
        ORDER BY a.data_agendamento ASC
    `;

    conexao.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao buscar agendamentos" });
        }

        res.json(results);
    });
});

app.post("/agendamentos", (req, res) => {

    const { cliente_id, servico_id, data_agendamento } = req.body;

    if (!cliente_id || !servico_id || !data_agendamento) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }

    const sql = `
        INSERT INTO agendamentos (cliente_id, servico_id, data_agendamento)
        VALUES (?, ?, ?)
    `;

    conexao.query(sql, [cliente_id, servico_id, data_agendamento], (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao criar agendamento" });
        }

        res.json({ mensagem: "Agendamento criado com sucesso!" });
    });
});

app.put("/agendamentos/:id", (req, res) => {

    const { id } = req.params;
    const { cliente_id, servico_id, data_agendamento } = req.body;

    const sql = `
        UPDATE agendamentos
        SET cliente_id = ?, servico_id = ?, data_agendamento = ?
        WHERE id = ?
    `;

    conexao.query(sql, [cliente_id, servico_id, data_agendamento, id], (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao atualizar agendamento" });
        }

        res.json({ mensagem: "Agendamento atualizado com sucesso!" });
    });
});

app.delete("/agendamentos/:id", (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM agendamentos WHERE id = ?";

    conexao.query(sql, [id], (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ erro: "Erro ao deletar agendamento" });
        }

        res.json({ mensagem: "Agendamento removido com sucesso!" });
    });
});

// SERVER
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

