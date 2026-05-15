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
let servicos = [];
let servicoSelecionado = null;
let modoEdicao = false;

// CARREGAR DO BACKEND
async function carregarServicos() {
    const resposta = await fetch("http://localhost:3000/servicos");
    servicos = await resposta.json();
    atualizarLista();
}

carregarServicos();

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

    servicos.forEach((servico) => {

        const item = document.createElement("li");

        item.textContent = `SERVIÇO: ${servico.nome} / Preço: R$ ${servico.preco}`;

        item.addEventListener("click", () => {

            document.querySelectorAll("#listaServico li")
                .forEach(li => li.classList.remove("selecionado"));

            item.classList.add("selecionado");

            servicoSelecionado = servico;
        });

        listaServico.appendChild(item);
    });
}

// ADICIONAR / EDITAR
btnAdicionar.addEventListener("click", async function () {

    const nome = nomeServico.value.trim();
    const preco = precoServico.value.trim();

    if (!nome || !preco) {
        alert("Preencha todos os campos!");
        return;
    }

    try {

        // MODO EDITAR (SALVAR)
        if (modoEdicao && servicoSelecionado) {
            console.log("SERVIÇO SELECIONADO:", servicoSelecionado);

            const resposta = await fetch(`http://localhost:3000/servicos/${servicoSelecionado.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, preco })
            });

            const resultado = await resposta.json();
            alert(resultado.mensagem);

            modoEdicao = false;
            servicoSelecionado = null;
            btnAdicionar.textContent = "ADICIONAR";
        }

        // MODO ADICIONAR
        else {

            const resposta = await fetch("http://localhost:3000/servicos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, preco })
            });

            const resultado = await resposta.json();
            alert(resultado.mensagem);
        }

        nomeServico.value = "";
        precoServico.value = "";

        carregarServicos();

    } catch (erro) {
        console.log("Erro:", erro);
        alert("Erro ao salvar serviço");
    }
});

//MODIFICAR
btnModificar.addEventListener("click", function () {

    if (!servicoSelecionado) {
        alert("Selecione um serviço!");
        return;
    }

    nomeServico.value = servicoSelecionado.nome;
    precoServico.value = servicoSelecionado.preco;

    modoEdicao = true;
    btnAdicionar.textContent = "SALVAR";
});

// EXCLUIR
btnExcluir.addEventListener("click", async function () {

    if (!servicoSelecionado) {
        alert("Selecione um serviço!");
        return;
    }

    try {

        const resposta = await fetch(`http://localhost:3000/servicos/${servicoSelecionado.id}`, {
            method: "DELETE"
        });

        const resultado = await resposta.json();
        alert(resultado.mensagem);

        servicoSelecionado = null;

        carregarServicos();

    } catch (erro) {
        console.log("Erro:", erro);
        alert("Erro ao excluir serviço");
    }
});

// CANCELAR CADASTRO
btnCancelarCadastro.addEventListener("click", function () {

    nomeServico.value = "";
    precoServico.value = "";

    servicoSelecionado = null;
    modoEdicao = false;

    btnAdicionar.textContent = "ADICIONAR";

    document.querySelectorAll("#listaServico li")
        .forEach(li => li.classList.remove("selecionado"));
});

// CANCELAR BUSCA
btnCancelarBusca.addEventListener("click", function () {
    procurarServico.value = "";
});

// BUSCA
btnProcurar.addEventListener("click", function () {

    const busca = procurarServico.value.trim().toLowerCase();

    document.querySelectorAll("#listaServico li")
        .forEach(li => li.classList.remove("selecionado"));

    servicos.forEach((servico, index) => {

        if (servico.nome.toLowerCase().includes(busca)) {

            const item = listaServico.children[index];

            if (item) item.classList.add("selecionado");
        }
    });
});