// 1. Simular dados (descobri que simular dados se chama "mock")
        const agendamentos = [
        { id: 1, servico: "Corte", nome: "João", horario: "2026-03-25T14:00" },
        { id: 2, servico: "Barba", nome: "Maria", horario: "2026-03-26T16:00" }
        ];

        // 2. Pegar o id da URL
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        //Pegar botão excluir e se NÃO tiver id esconder botão
        const btnExcluir = document.getElementById("btnExcluir");
        if (!id) {
            btnExcluir.style.display = "none";
        } 
        
        // 3. Se tiver id - preencher formulário
        if (id) {
        const agendamento = agendamentos.find(a => a.id == id);

        if (agendamento) {
            document.getElementById("nome").value = agendamento.nome;
            document.getElementById("servico").value = agendamento.servico;
            document.getElementById("horario").value = agendamento.horario;
        }
        }
        // 4. Capturar envio do formulário
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

        // redirecionar - pagina principal
        window.location.href = "MainScreen.html";
        });