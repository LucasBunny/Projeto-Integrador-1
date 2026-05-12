const nomeLogin = document.getElementById("nomeLogin");
const senhaLogin = document.getElementById("senhaLogin");

const btnEntrar = document.getElementById("btnEntrar");
const btnCriarConta = document.getElementById("btnCriarConta");

btnEntrar.addEventListener("click", function () {

    const nomeDigitado = nomeLogin.value.trim();
    const senhaDigitada = senhaLogin.value.trim();

    const nomeSalvo = localStorage.getItem("nomeUsuario");
    const senhaSalva = localStorage.getItem("senhaUsuario");

    // verifica se existe conta
     if (nomeSalvo === null || senhaSalva === null) {
        alert("Nenhuma conta cadastrada!");
        return;
    }

    if (senhaDigitada === senhaSalva && senhaDigitada === senhaSalva) {
        alert("Login realizado com sucesso!");
        window.location.href = "./telaPrincipal.html";

    } else {
        alert("Usuário ou senha incorreta!");
    }
});


btnCriarConta.addEventListener("click", function () {
    window.location.href = "./criarConta.html";
});