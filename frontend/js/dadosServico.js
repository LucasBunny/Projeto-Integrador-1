
// DOM
const nomeServico = document.getElementById("nomeServico");
const precoServico = document.getElementById("precoServico");
const procurarServico = document.getElementById("procurarServico");

const btnAdicionar = document.getElementById("btnAdicionar");
const btnExcluir = document.getElementById("btnExcluir");
const btnModificar = document.getElementById("btnModificar");
const btnCancelarCadastro = document.getElementById("btnCancelarCadastro");
const btnCancelarBusca = document.getElementById("btnCancelarBusca");
const btnProcurar = document.getElementById("btnProcurar");

const listaServico = document.getElementById("listaServico");

// STATE
let servicoSelecionado = null;
let modoEdicao = false;

let servicos = JSON.parse(localStorage.getItem("servicos")) || [];

// STORAGE
function salvarServicos() {
    localStorage.setItem("servicos", JSON.stringify(servicos));
}

// MÁSCARAS
function formatarNome(input) {

    input.addEventListener("input", function () {

        let valor = input.value;

        valor = valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
        valor = valor.toLowerCase();

        valor = valor.replace(/(^|[\s-])(\p{L})/gu, function (_, sep, letra) {
            return sep + letra.toUpperCase();
        });

        input.value = valor;
    });
}

// aplica máscara
formatarNome(nomeServico);
formatarNome(procurarServico);

// LISTA
function atualizarLista() {

    listaServico.innerHTML = "";

    servicos.forEach((servico, index) => {

        const item = document.createElement("li");

        item.textContent = `SERVIÇO: ${servico.nome} / Preço: R$ ${servico.preco}`;

        item.addEventListener("click", () => {

            document.querySelectorAll("li")
                .forEach(li => li.classList.remove("selecionado"));

            item.classList.add("selecionado");

            servicoSelecionado = index;
        });

        listaServico.appendChild(item);
    });
}

atualizarLista();

// ADICIONAR
btnAdicionar.addEventListener("click", function () {

    const nome = nomeServico.value.trim();
    const preco = precoServico.value.trim();

    if (!nome || !preco) {
        alert("Preencha todos os campos!");
        return;
    }

    const servico = {
        nome,
        preco
    };

    if (modoEdicao) {

        servicos[servicoSelecionado] = servico;

        modoEdicao = false;
        btnAdicionar.textContent = "ADICIONAR";
        servicoSelecionado = null;

    } else {
        servicos.push(servico);
    }

    salvarServicos();
    atualizarLista();

    nomeServico.value = "";
    precoServico.value = "";
});

// EXCLUIR
btnExcluir.addEventListener("click", function () {

    if (servicoSelecionado === null) {
        alert("Selecione um serviço!");
        return;
    }

    servicos.splice(servicoSelecionado, 1);

    servicoSelecionado = null;

    salvarServicos();
    atualizarLista();
});

// MODIFICAR
btnModificar.addEventListener("click", function () {

    if (servicoSelecionado === null) {
        alert("Selecione um serviço!");
        return;
    }

    nomeServico.value = servicos[servicoSelecionado].nome;
    precoServico.value = servicos[servicoSelecionado].preco;

    modoEdicao = true;
    btnAdicionar.textContent = "SALVAR";
});

// CANCELAR CADASTRO
btnCancelarCadastro.addEventListener("click", function () {

    nomeServico.value = "";
    precoServico.value = "";

    servicoSelecionado = null;
    modoEdicao = false;

    btnAdicionar.textContent = "ADICIONAR";

    document.querySelectorAll("li")
        .forEach(li => li.classList.remove("selecionado"));
});

// CANCELAR BUSCA
btnCancelarBusca.addEventListener("click", function () {

    procurarServico.value = "";

    document.querySelectorAll("li")
        .forEach(li => li.classList.remove("selecionado"));

    servicoSelecionado = null;
});

// BUSCA
btnProcurar.addEventListener("click", function () {

    const busca = procurarServico.value.trim().toLowerCase();

    document.querySelectorAll("li")
        .forEach(li => li.classList.remove("selecionado"));

    servicoSelecionado = null;

    let encontrou = false;

    servicos.forEach((servico, index) => {

        const nomeOk = servico.nome.toLowerCase().includes(busca);

        if (nomeOk) {

            const item = listaServico.children[index];

            item.classList.add("selecionado");

            servicoSelecionado = index;
            encontrou = true;
        }
    });

    alert(encontrou ? "Serviço encontrado!" : "Serviço não encontrado!");
});