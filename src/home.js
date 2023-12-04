window.onload = function (e) {

    var usuarioGuid = localStorage.getItem("usuarioGuid");

    if (usuarioGuid == null) {
        window.location.href = "login.html";

        alert("Ação não Permitida. Faça Login ou cadastre-se.");
    }
    else {
        obterUsuario(usuarioGuid);
    }

    var lnkSair = document.getElementById("lnkSair");

    lnkSair.onclick = function (e) {
        localStorage.removeItem("usuarioGuid");

        window.location.href = "login.html";
    }

    var menu = document.getElementById("menu");

    menu.onclick = function (e) {
        var x = document.getElementById("menu");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    function obterUsuario(usuarioGuid) {
        // WARNING: For GET requests, body is set to null by browsers.

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var homeResult = JSON.parse(this.responseText);
                if (homeResult.sucesso) {
                    //Sucesso
                    var spnMensagem = document.getElementById("spnMensagem");

                    spnMensagem.innerText = "Bem vindo(a) ao sistema " + homeResult.nome + "!";
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