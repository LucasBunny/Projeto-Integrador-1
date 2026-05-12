const nome = document.getElementById("nome");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");


btnSalvar.addEventListener("click", function () {

    // remove espaços vazios
    const nomeValor = nome.value.trim();
    const senhaValor = senha.value.trim();
    const confirmarSenhaValor = confirmarSenha.value.trim();

    // Verifica se os campos estão vazios
    if (
        nomeValor === "" ||
        senhaValor === "" ||
        confirmarSenhaValor === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    if (senhaValor !== confirmarSenhaValor) {
        alert("As senhas não coincidem!");
        return;
    }

    // Salva no localStorage
    localStorage.setItem("nomeUsuario", nomeValor);
    localStorage.setItem("senhaUsuario", senhaValor);

    alert("Conta criada com sucesso!");

    // Redireciona para index.html
    window.location.href = "./index.html";
});

btnCancelar.addEventListener("click", function () {

    // Apenas redireciona
    window.location.href = "./index.html";
});