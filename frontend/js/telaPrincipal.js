const dataHora = document.querySelector(".top-right");

function atualizarDataHora() {

    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    dataHora.textContent = `${dia}/${mes} - ${horas}:${minutos}`;
}

atualizarDataHora();
setInterval(atualizarDataHora, 1000);

const lista = document.getElementById("listaAgendamentos");

// FORMATAR DATA
function formatarData(dataISO) {

    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");

    return `${dia}/${mes} - ${horas}:${minutos}`;
}

// CARREGAR DO BACKEND
async function carregarAgendamentos() {

    const resposta = await fetch("http://localhost:3000/agendamentos");
    const agendamentos = await resposta.json();

    lista.innerHTML = "";

    agendamentos.forEach(function (agendamento) {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${formatarData(agendamento.data_agendamento)}</h2>

            <div class="service">
                Cliente: ${agendamento.cliente_nome}
                <br>
                Serviço: ${agendamento.servico_nome}
            </div>

            <div class="edit" style="cursor:pointer">
                EDITAR
            </div>
        `;

        const btnEditar = card.querySelector(".edit");

        btnEditar.addEventListener("click", function () {
            window.location.href = `./agendamento.html?id=${agendamento.id}`;
        });

        lista.appendChild(card);
    });
}

carregarAgendamentos();