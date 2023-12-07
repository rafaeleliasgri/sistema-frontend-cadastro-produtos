/* Este código faz validação do preenchimento dos campos, envia dados formato JSON
para a API e recebe a resposta da API. Se o novo usuário não existe, retorna a mensagem
de erro, com a resposta enviada pela API. Se o novo usuário já existe (o e-mail de recuperação
de senha foi enviado pela API) exibe mensagem confirmando o sucesso do envio. */

window.onload = function (e) {

    var buttonRecuperarSenha = document.getElementById("buttonRecuperarSenha");
    var txtEmail = document.getElementById("txtEmail");

    txtEmail.focus();

    buttonRecuperarSenha.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        if (email == "") {
            exibirMensagemErro("Campo e-mail obrigatório");
        }
        else {
            recuperarSenha(email);
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

    function recuperarSenha(email) {

        var data = JSON.stringify({
            "email": email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var esqueceuSenhaResultado = JSON.parse(this.responseText);

                if (esqueceuSenhaResultado.sucesso) {
                    alert("E-mail enviado com sucesso!");
                }
                else {
                    exibirMensagemErro(esqueceuSenhaResultado.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:7183/api/UsuarioController/EsqueceuSenha");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    };
}