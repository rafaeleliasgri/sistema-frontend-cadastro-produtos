/* Este código faz validação do preenchimento dos campos, envia dados formato JSON
para a API, recebe a resposta da API e loga o usuário (enviando-o à página Home) ou exibe 
mensagem de erro enviada pela API */ 

window.onload = function (e) {

    var buttonLogin = document.getElementById("buttonLogin");
    var txtEmail = document.getElementById("txtEmail");
    var txtSenha = document.getElementById("txtSenha");

    txtEmail.focus();

    buttonLogin.onclick = function (e) {

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

        var spanErro = document.getElementById("spanErro");

        spanErro.style.display = "block";
        spanErro.innerText = mensagem;

        setTimeout(function () {
            spanErro.style.display = "none";
        }, 5000);
    };

    function realizarLogin(email, senha) {

        var data = JSON.stringify({

            "email": email,
            "senha": senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {

            if (this.readyState === 4) {

                var loginResultado = JSON.parse(this.responseText);

                if (loginResultado.sucesso) {
                    localStorage.setItem("usuarioGuid", loginResultado.usuarioGuid);
                    
                    window.location.href = "home.html";
                }
                else {
                    exibirMensagemErro(loginResultado.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:7183/api/UsuarioController/Login");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    };
}