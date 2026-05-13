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
let clienteSelecionado = null;
let modoEdicao = false;

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

// STORAGE HELPERS
function salvarClientes() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

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

// LISTA
function atualizarLista() {
    listaClientes.innerHTML = "";

    clientes.forEach((cliente, index) => {
        const item = document.createElement("li");

        item.textContent = `CLIENTE: ${cliente.nome} / Celular: ${cliente.celular}`;

        item.addEventListener("click", () => {

            document.querySelectorAll("li")
                .forEach(li => li.classList.remove("selecionado"));

            item.classList.add("selecionado");

            clienteSelecionado = index;
        });

        listaClientes.appendChild(item);
    });
}

atualizarLista();

// ADICIONAR
btnAdicionar.addEventListener("click", function () {

    const nome = nomeCliente.value.trim();
    const celular = celularCliente.value.trim();
    const celularNumeros = celular.replace(/\D/g, "");

    if (!nome || !celular) {
        alert("Preencha todos os campos!");
        return;
    }

    if (celularNumeros.length !== 11) {
        alert("Digite um celular válido!");
        return;
    }

    const cliente = {
        nome,
        celular
    };

    if (modoEdicao) {
        clientes[clienteSelecionado] = cliente;
        modoEdicao = false;
        btnAdicionar.textContent = "ADICIONAR";
        clienteSelecionado = null;
    } else {
        clientes.push(cliente);
    }

    salvarClientes();
    atualizarLista();

    nomeCliente.value = "";
    celularCliente.value = "";
});

// EXCLUIR
btnExcluir.addEventListener("click", function () {

    if (clienteSelecionado === null) {
        alert("Selecione um cliente!");
        return;
    }

    clientes.splice(clienteSelecionado, 1);

    clienteSelecionado = null;

    salvarClientes();
    atualizarLista();
});

// MODIFICAR
btnModificar.addEventListener("click", function () {

    if (clienteSelecionado === null) {
        alert("Selecione um cliente!");
        return;
    }

    nomeCliente.value = clientes[clienteSelecionado].nome;
    celularCliente.value = clientes[clienteSelecionado].celular;

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

    clientes.forEach((cliente, index) => {

        const nomeOk = cliente.nome.toLowerCase().includes(nomeBusca);
        const celularOk = cliente.celular.includes(celularBusca);

        if (nomeOk && celularOk) {
            const item = listaClientes.children[index];

            item.classList.add("selecionado");
            clienteSelecionado = index;
            encontrou = true;
        }
    });

    alert(encontrou ? "Cliente encontrado!" : "Cliente não encontrado!");
});