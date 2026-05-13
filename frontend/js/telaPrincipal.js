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

const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
const lista = document.getElementById("listaAgendamentos");

function formatarData(dataISO) {

    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");

    return `${dia}/${mes} - ${horas}:${minutos}`;
}

agendamentos.forEach(function (agendamento) {

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h2>${formatarData(agendamento.horario)}</h2>

        <div class="service">
            Cliente: ${agendamento.nome}
            <br>
            Serviço: ${agendamento.servico}
        </div>

        <div class="edit">
            EDITAR
        </div>
    `;

    const btnEditar = card.querySelector(".edit");

    btnEditar.addEventListener("click", function () {

        window.location.href = `./agendamento.html?id=${agendamento.id}`;
    });

    lista.appendChild(card);
});