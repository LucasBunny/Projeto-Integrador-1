const agendamentos = [
    { id: 1, servico: "Corte", nome: "João", horario: "2026-03-25T14:00" },
    { id: 2, servico: "Barba", nome: "Maria", horario: "2026-03-26T16:00" }
];

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const btnExcluir = document.getElementById("btnExcluir");
if (!id) {
    btnExcluir.style.display = "none";
} 
        
if (id) {
    const agendamento = agendamentos.find(a => a.id == id);

    if (agendamento) {
        document.getElementById("nome").value = agendamento.nome;
        document.getElementById("servico").value = agendamento.servico;
        document.getElementById("horario").value = agendamento.horario;
    }
}

const form = document.getElementById("formAgendamento");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const servico = document.getElementById("servico").value;
    const horario = document.getElementById("horario").value;

    if (id) {
        console.log("Editando agendamento:", { id, nome, servico, horario });
    } else {
        console.log("Criando novo agendamento:", { nome, servico, horario });
    }

    window.location.href = "./telaPrincipal.html";
});