window.onload = function (e) {

    var btnRecSenha = document.getElementById("btnRecSenha");

    var txtEmail = document.getElementById("txtEmail");

    txtEmail.focus();

    //* Sempre que há definição de função, deve haver o ponto e vírgula no fina, após a chave *//
    btnRecSenha.onclick = function (e) {

        //* O comando abaixo impede que a página se autoatualize ao se clicar no botão, pelo fato
        //*dos elementos se encontrarem dentro de um "form" do html.// 
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
        var spnErro = document.getElementById("spnErro");

        spnErro.style.display = "block";

        spnErro.innerText = mensagem;

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    };

    function recuperarSenha(email) {

        // WARNING: For POST requests, body is set to null by browsers.
        var data = JSON.stringify({
            "email": email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var esqSenhResul = JSON.parse(this.responseText);

                if (esqSenhResul.sucesso) {
                    alert("E-mail enviado com sucesso!");
                }
                else {
                    exibirMensagemErro(esqSenhResul.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:7183/api/UsuarioController/EsqueceuSenha");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

    };

}