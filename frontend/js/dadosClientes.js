// URL PARAMS
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// DOM
const nomeCliente = document.getElementById("nomeCliente");
const buscarNome = document.getElementById("buscarNome");
const celularCliente = document.getElementById("celularCliente");
const buscarCelular = document.getElementById("buscarCelular");

const btnAdicionar = document.getElementById("btnAdicionar");
const btnExcluir = document.getElementById("btnExcluir");
const btnModificar = document.getElementById("btnModificar");
const btnCancelarCadastro = document.getElementById("btnCancelarCadastro");
const btnCancelarBusca = document.getElementById("btnCancelarBusca");
const btnProcurar = document.getElementById("btnProcurar");

const listaClientes = document.getElementById("listaClientes");

// STATE
let clientes = [];
let clienteSelecionado = null;
let modoEdicao = false;

// MÁSCARAS
function formatarNome(input) {
    input.addEventListener("input", function () {
        let valor = input.value;

        valor = valor.slice(0, 50);
        valor = valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
        valor = valor.toLowerCase();

        valor = valor.replace(/(^|[\s-])(\p{L})/gu, function (_, sep, letra) {
            return sep + letra.toUpperCase();
        });

        input.value = valor;
    });
}

function mascaraCelular(input) {
    input.addEventListener("input", function () {
        let valor = input.value;

        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

        input.value = valor;
    });
}

// aplica máscaras
formatarNome(nomeCliente);
formatarNome(buscarNome);
mascaraCelular(celularCliente);
mascaraCelular(buscarCelular);

// CARREGAR DO BACKEND
async function carregarClientes() {
    const resposta = await fetch("http://localhost:3000/clientes");
    clientes = await resposta.json();

    atualizarLista();
}

carregarClientes();

// LISTA
function atualizarLista() {
    listaClientes.innerHTML = "";

    clientes.forEach((cliente) => {
        const item = document.createElement("li");

        item.textContent = `CLIENTE: ${cliente.nome} / Celular: ${cliente.telefone}`;

        item.addEventListener("click", () => {

            document.querySelectorAll("li")
                .forEach(li => li.classList.remove("selecionado"));

            item.classList.add("selecionado");
            clienteSelecionado = cliente;
        });

        listaClientes.appendChild(item);
    });
}


// ADICIONAR
btnAdicionar.addEventListener("click", async function () {

    const nome = nomeCliente.value.trim();
    const telefone = celularCliente.value.trim();
    const telefoneNumeros = telefone.replace(/\D/g, "");

    if (!nome || !telefone) {
        alert("Preencha todos os campos!");
        return;
    }

    if (telefoneNumeros.length !== 11) {
        alert("Digite um celular válido!");
        return;
    }

    try {

        // MODO EDITAR
        if (clienteSelecionado && clienteSelecionado.id) {

            const resposta = await fetch(`http://localhost:3000/clientes/${clienteSelecionado.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, telefone })
            });

            const resultado = await resposta.json();

            alert(resultado.mensagem);

            clienteSelecionado = null;

        } 
        // MODO ADICIONAR
        else {

            const resposta = await fetch("http://localhost:3000/clientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, telefone })
            });

            const resultado = await resposta.json();

            alert(resultado.mensagem);
        }

        nomeCliente.value = "";
        celularCliente.value = "";

        carregarClientes();

    } catch (erro) {
        console.log("Erro:", erro);
        alert("Erro ao salvar cliente");
    }
});

// EXCLUIR (vai funcionar só se backend tiver DELETE)
btnExcluir.addEventListener("click", async function () {

    if (!clienteSelecionado) {
        alert("Selecione um cliente!");
        return;
    }

    try {
        const resposta = await fetch(`http://localhost:3000/clientes/${clienteSelecionado.id}`, {
            method: "DELETE"
        });

        const resultado = await resposta.json();
        alert(resultado.mensagem);

        clienteSelecionado = null;
        carregarClientes();

    } catch (erro) {
        console.log("Erro ao excluir:", erro);
        alert("Erro ao excluir cliente");
    }
});

// MODIFICAR (ainda visual)
btnModificar.addEventListener("click", function () {

    if (clienteSelecionado === null) {
        alert("Selecione um cliente!");
        return;
    }

    nomeCliente.value = clienteSelecionado.nome;
    celularCliente.value = clienteSelecionado.telefone;

    modoEdicao = true;
    btnAdicionar.textContent = "SALVAR";
});

// CANCELAR CADASTRO
btnCancelarCadastro.addEventListener("click", function () {

    nomeCliente.value = "";
    celularCliente.value = "";

    clienteSelecionado = null;
    modoEdicao = false;

    btnAdicionar.textContent = "ADICIONAR";

    document.querySelectorAll("li")
        .forEach(li => li.classList.remove("selecionado"));
});

// BUSCA
btnCancelarBusca.addEventListener("click", function () {
    buscarNome.value = "";
    buscarCelular.value = "";
});

btnProcurar.addEventListener("click", function () {

    let encontrou = false;

    const nomeBusca = buscarNome.value.trim().toLowerCase();
    const celularBusca = buscarCelular.value.trim();

    document.querySelectorAll("li")
        .forEach(li => li.classList.remove("selecionado"));

    clienteSelecionado = null;

    clientes.forEach((cliente) => {

        const nomeOk = cliente.nome.toLowerCase().includes(nomeBusca);
        const celularOk = cliente.telefone.includes(celularBusca);

        if (nomeOk && celularOk) {
            encontrou = true;
        }
    });

    alert(encontrou ? "Cliente encontrado!" : "Cliente não encontrado!");
});