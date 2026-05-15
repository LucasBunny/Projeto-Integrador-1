const nome = document.getElementById("nome");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

btnSalvar.addEventListener("click", async function () {

    const nomeValor = nome.value.trim();
    const senhaValor = senha.value.trim();
    const confirmarSenhaValor = confirmarSenha.value.trim();

    if (!nomeValor || !senhaValor || !confirmarSenhaValor) {
        alert("Preencha todos os campos!");
        return;
    }

    if (senhaValor !== confirmarSenhaValor) {
        alert("As senhas não coincidem!");
        return;
    }

    try {

        const resposta = await fetch("http://localhost:3000/barbeiros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nomeValor,
                senha: senhaValor
            })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.erro || "Erro ao criar conta");
            return;
        }

        alert("Conta criada com sucesso!");
        window.location.href = "./index.html";

    } catch (erro) {
        console.log("Erro ao criar conta:", erro);
        alert("Erro ao conectar com o servidor");
    }
});

btnCancelar.addEventListener("click", function () {
    window.location.href = "./index.html";
});