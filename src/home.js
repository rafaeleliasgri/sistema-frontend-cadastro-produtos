/* Este código faz validação do de usuário logado impedindo que se consiga acessar 
a página Home sem passar pelas páginas de login ou cadastro de novo usuário. Também
adiciona a uma mensagem de boas vindas o usuário cadastrado e logado vinda da API. */

window.onload = function (e) {

    var usuarioGuid = localStorage.getItem("usuarioGuid");

    if (usuarioGuid == null) {
        window.location.href = "login.html";

        alert("Ação não Permitida. Faça Login ou cadastre-se.");
    }
    else {
        obterUsuario(usuarioGuid);
    }

    var linkSair = document.getElementById("linkSair");

    linkSair.onclick = function (e) {
        localStorage.removeItem("usuarioGuid");

        window.location.href = "login.html";
    }

    var menu = document.getElementById("menu");

    menu.onclick = function (e) {

        var x = document.getElementById("menu");

        if (x.className === "topnav") {
            x.className += " responsive";
        }
        else {
            x.className = "topnav";
        }
    }

    function obterUsuario(usuarioGuid) {

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var homeResultado = JSON.parse(this.responseText);

                if (homeResultado.sucesso) {
                    var spanMensagem = document.getElementById("spanMensagem");

                    spanMensagem.innerText = "Bem vindo(a) ao sistema " + homeResultado.nome + "!";
                }
                else {
                    window.location.href = "home.html";
                }
            }
        });

        xhr.open("GET", "https://localhost:7183/api/UsuarioController/obterusuario?usuarioGuid=" + usuarioGuid);
        xhr.send();
    }
}