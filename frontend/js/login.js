const nomeLogin = document.getElementById("nomeLogin");
const senhaLogin = document.getElementById("senhaLogin");

const btnEntrar = document.getElementById("btnEntrar");
const btnCriarConta = document.getElementById("btnCriarConta");

btnEntrar.addEventListener("click", async function () {

    const nomeDigitado = nomeLogin.value.trim();
    const senhaDigitada = senhaLogin.value.trim();

    if (!nomeDigitado || !senhaDigitada) {
        alert("Preencha todos os campos!");
        return;
    }

    try {

        const resposta = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nomeDigitado,
                senha: senhaDigitada
            })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.erro || "Usuário ou senha inválidos");
            return;
        }

        localStorage.setItem("usuarioLogado", JSON.stringify(resultado.usuario));

        window.location.href = "./telaPrincipal.html";

    } catch (erro) {
        console.log("Erro no login:", erro);
        alert("Erro ao conectar com o servidor");
    }
});

btnCriarConta.addEventListener("click", function () {
    window.location.href = "./criarConta.html";
});