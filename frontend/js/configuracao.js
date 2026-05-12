const btnClientes = document.getElementById("btnClientes");
const btnServicos = document.getElementById("btnServicos");

btnClientes.addEventListener("click", function () {

    window.location.href = "./dadosCliente.html";
});

btnServicos.addEventListener("click", function () {

    window.location.href = "./dadosServicos.html";
});