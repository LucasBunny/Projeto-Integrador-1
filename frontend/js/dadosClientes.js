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

let clienteSelecionado = null;
let modoEdicao = false;
let clientes = [];

// Mascaras
function formatarNome(input) {

    input.addEventListener("input", function () {

        let valor = input.value;

        valor = valor.slice(0, 11);
        valor = valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
        valor = valor.toLowerCase();
        valor = valor.replace(/\b\w/g, function (letra) {
            return letra.toUpperCase();
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

formatarNome(nomeCliente);
formatarNome(buscarNome);
mascaraCelular(celularCliente);
mascaraCelular(buscarCelular);

function atualizarLista() {

    listaClientes.innerHTML = "";

    clientes.forEach(function (cliente, index) {

        const item = document.createElement("li");
        item.textContent =
            `CLIENTE: ${cliente.nome} / Celular: ${cliente.celular}`;
    
        // clique para selecionar
        item.addEventListener("click", function () {

            // remove seleção antiga
            const itens = document.querySelectorAll("li");
            itens.forEach(function (li) {
                li.classList.remove("selecionado");
            });

            // adiciona seleção atual
            item.classList.add("selecionado");

            // guarda índice
            clienteSelecionado = index;
        });

        listaClientes.appendChild(item);
    });

}


btnAdicionar.addEventListener("click", function () {

    const nome = nomeCliente.value.trim();
    const celular = celularCliente.value.trim();
    const celularNumeros = celular.replace(/\D/g, "");

    if (nome === "" || celular === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (celularNumeros.length !== 11) {
        alert("Digite um celular válido!");

        return;
    }

    const cliente = {
        nome: nome,
        celular: celular
    };

    if (modoEdicao === true) {
    clientes[clienteSelecionado] = cliente;
    modoEdicao = false;
    clienteSelecionado = null;
    } else{
        clientes.push(cliente);
    }

    atualizarLista();

    nomeCliente.value = "";
    celularCliente.value = "";
});


btnExcluir.addEventListener("click", function () {

    if (clienteSelecionado === null) {
        alert("Selecione um cliente!");
        return;
    }

    clientes.splice(clienteSelecionado, 1);
    clienteSelecionado = null;

    atualizarLista();
});


btnModificar.addEventListener("click", function () {

    if (clienteSelecionado === null) {
        alert("Selecione um cliente!");
        return;
    }

    nomeCliente.value = clientes[clienteSelecionado].nome;
    celularCliente.value = clientes[clienteSelecionado].celular;
    modoEdicao = true;
});


btnCancelarCadastro.addEventListener("click", function () {

    nomeCliente.value = "";
    celularCliente.value = "";

    clienteSelecionado = null;

    modoEdicao = false;

    // remove destaque visual
    const itens = document.querySelectorAll("li");

    itens.forEach(function (li) {

        li.classList.remove("selecionado");
    });
});


btnCancelarBusca.addEventListener("click", function () {
    buscarNome.value = "";
    buscarCelular.value = "";
});


btnProcurar.addEventListener("click", function () {

    const nomeBusca =
        buscarNome.value.trim().toLowerCase();

    const celularBusca =
        buscarCelular.value.trim();

    const itens = document.querySelectorAll("li");

    itens.forEach(function (item) {

        item.classList.remove("selecionado");
    });

    clienteSelecionado = null;

    clientes.forEach(function (cliente, index) {

        const nomeCorresponde =
            cliente.nome.toLowerCase().includes(nomeBusca);

        const celularCorresponde =
            cliente.celular.includes(celularBusca);

        if (nomeCorresponde && celularCorresponde) {
            const itemLista = itens[index];
            itemLista.classList.add("selecionado");
            clienteSelecionado = index;
            encontrou = true;
        }

        if (encontrou === true) {
            alert("Cliente encontrado!");
        } else {
            alert("Cliente não encontrado!");
        }
    });
});