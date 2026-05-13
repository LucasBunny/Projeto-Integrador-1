const params = new URLSearchParams(window.location.search);
const id = params.get("id");

//  DOM 
const titulo = document.getElementById("titulo");
const btnSalvar = document.getElementById("btnSalvar");
const btnExcluir = document.getElementById("btnExcluir");
const btnCancelar = document.getElementById("btnCancelar");

const inputNome = document.getElementById("nome");
const inputServico = document.getElementById("servico");
const inputHorario = document.getElementById("horario");

const form = document.getElementById("formAgendamento");

function getAgendamentos() {
    return JSON.parse(localStorage.getItem("agendamentos")) || [];
}

function saveAgendamentos(data) {
    localStorage.setItem("agendamentos", JSON.stringify(data));
}

//  CLIENTES 
const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

clientes.forEach(cliente => {
    const option = document.createElement("option");
    option.value = cliente.nome;
    option.textContent = cliente.nome;
    inputNome.appendChild(option);
});

//  SERVIÇOS 
const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

servicos.forEach(item => {
    const option = document.createElement("option");
    option.value = item.nome;
    option.textContent = item.nome;
    inputServico.appendChild(option);
});

//  INIT (EDIÇÃO OU NOVO) 
const agendamentos = getAgendamentos();

if (id) {
    titulo.textContent = "EDITAR AGENDAMENTO";
    btnSalvar.textContent = "SALVAR";

    const agendamento = agendamentos.find(a => a.id == id);

    if (agendamento) {
        inputNome.value = agendamento.nome;
        inputServico.value = agendamento.servico;
        inputHorario.value = agendamento.horario;
    }
} else {
    titulo.textContent = "NOVO AGENDAMENTO";
    btnSalvar.textContent = "ADICIONAR";
    btnExcluir.style.display = "none";
}

//  SALVAR 
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!inputNome.value || !inputServico.value || !inputHorario.value) {
        alert("Preencha todos os campos!");
        return;
    }

    const agendamentos = getAgendamentos();

    const dados = {
        id: id ? Number(id) : Date.now(),
        nome: inputNome.value,
        servico: inputServico.value,
        horario: inputHorario.value
    };

    if (id) {
        const index = agendamentos.findIndex(a => a.id == id);
        agendamentos[index] = dados;
    } else {
        agendamentos.push(dados);
    }

    saveAgendamentos(agendamentos);

    window.location.href = "./telaPrincipal.html";
});

//  EXCLUIR 
btnExcluir.addEventListener("click", function () {
    let agendamentos = getAgendamentos();

    agendamentos = agendamentos.filter(a => a.id != id);

    saveAgendamentos(agendamentos);

    window.location.href = "./telaPrincipal.html";
});

//  CANCELAR 
btnCancelar.addEventListener("click", function () {
    window.location.href = "./telaPrincipal.html";
});