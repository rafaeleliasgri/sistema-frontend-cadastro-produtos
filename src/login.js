window.onload = function (e) {

    var btnLogin = document.getElementById("btnLogin");

    var txtEmail = document.getElementById("txtEmail");

    var txtSenha = document.getElementById("txtSenha");

    txtEmail.focus();

    //* Sempre que há definição de função, deve haver o ponto e vírgula no fina, após a chave *//
    btnLogin.onclick = function (e) {

        //* O comando abaixo impede que a página se autoatualize ao se clicar no botão, pelo fato
        //*dos elementos se encontrarem dentro de um "form" do html.// 
        e.preventDefault();

        var email = txtEmail.value;

        var senha = txtSenha.value;

        if (email == "") {
            exibirMensagemErro("Campo e-mail obrigatório");
        }
        else if (senha == "") {
            exibirMensagemErro("Campo senha obrigatório");
        }
        else {
            realizarLogin(email, senha);
        }

    };

    function exibirMensagemErro(mensagem) {
        var spnErro = document.getElementById("spnErro");

        spnErro.style.display = "block";

        spnErro.innerText = mensagem;

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    };

    function realizarLogin(email, senha) {

        // WARNING: For POST requests, body is set to null by browsers.
        var data = JSON.stringify({
            "email": email,
            "senha": senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                
                var loginResul = JSON.parse(this.responseText);

                if (loginResul.sucesso) {
                    //Sucesso
                    localStorage.setItem("usuarioGuid", loginResul.usuarioGuid);

                    window.location.href = "home.html";
                }
                else
                {
                    exibirMensagemErro(loginResul.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:7183/api/UsuarioController/Login");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

    };

}