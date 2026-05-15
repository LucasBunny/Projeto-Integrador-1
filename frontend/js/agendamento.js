// URL PARAMS
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// DOM
const titulo = document.getElementById("titulo");
const btnSalvar = document.getElementById("btnSalvar");
const btnExcluir = document.getElementById("btnExcluir");
const btnCancelar = document.getElementById("btnCancelar");

const inputNome = document.getElementById("nome");
const inputServico = document.getElementById("servico");
const inputHorario = document.getElementById("horario");

const form = document.getElementById("formAgendamento");

// CARREGAR CLIENTES
async function carregarClientes() {
    const resposta = await fetch("http://localhost:3000/clientes");
    const clientes = await resposta.json();

    clientes.forEach(cliente => {
        const option = document.createElement("option");
        option.value = cliente.id;
        option.textContent = cliente.nome;
        inputNome.appendChild(option);
    });
}

// CARREGAR SERVIÇOS
async function carregarServicos() {
    const resposta = await fetch("http://localhost:3000/servicos");
    const servicos = await resposta.json();

    servicos.forEach(servico => {
        const option = document.createElement("option");
        option.value = servico.id;
        option.textContent = servico.nome;
        inputServico.appendChild(option);
    });
}

// INIT (EDITAR OU NOVO)
async function carregarAgendamentoPorId(id) {

    if (!id || id === "null" || id === "undefined") return;

    const resposta = await fetch(`http://localhost:3000/agendamentos/${id}`);

    if (!resposta.ok) {
        console.log("Erro ao buscar agendamento");
        return;
    }

    const agendamento = await resposta.json();

    inputNome.value = String(agendamento.cliente_id);
    inputServico.value = String(agendamento.servico_id);
    inputHorario.value = agendamento.data_agendamento;
}


async function iniciar() {

    await carregarClientes();
    await carregarServicos();

    if (id) {
        titulo.textContent = "EDITAR AGENDAMENTO";
        btnSalvar.textContent = "SALVAR";
        btnExcluir.style.display = "block";

        await carregarAgendamentoPorId(id);
    } else {
        titulo.textContent = "NOVO AGENDAMENTO";
        btnExcluir.style.display = "none";
    }
}

iniciar();

// SALVAR (POST / PUT)
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!inputNome.value || !inputServico.value || !inputHorario.value) {
        alert("Preencha todos os campos!");
        return;
    }

    const dados = {
        cliente_id: inputNome.value,
        servico_id: inputServico.value,
        data_agendamento: inputHorario.value
    };

    try {

        if (id) {

            const resposta = await fetch(`http://localhost:3000/agendamentos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();
            alert(resultado.mensagem);
        }

        else {

            const resposta = await fetch("http://localhost:3000/agendamentos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();
            alert(resultado.mensagem);
        }

        window.location.href = "./telaPrincipal.html";

    } catch (erro) {
        console.log("Erro:", erro);
        alert("Erro ao salvar agendamento");
    }
});

// EXCLUIR
btnExcluir.addEventListener("click", async function () {

    if (!id) return;

    try {

        await fetch(`http://localhost:3000/agendamentos/${id}`, {
            method: "DELETE"
        });

        window.location.href = "./telaPrincipal.html";

    } catch (erro) {
        console.log("Erro ao excluir:", erro);
        alert("Erro ao excluir agendamento");
    }
});

// CANCELAR
btnCancelar.addEventListener("click", function () {
    window.location.href = "./telaPrincipal.html";
});