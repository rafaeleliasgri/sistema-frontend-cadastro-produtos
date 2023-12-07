/* Este código faz validação do preenchimento dos campos, envia dados formato JSON
para a API e recebe a resposta da API. Se o novo usuário já existe, retorna a mensagem
de erro, com a resposta enviada pela API. Se o novo usuário não existe e foi
corretamente cadastrado (dados inseridos pela API na tabela MySQL-Server), então ele
é logado e enviado à página Home.*/ 

window.onload = function (e) {

    var buttonCadastrar = document.getElementById("buttonCadastrar");
    var txtNome = document.getElementById("txtNome");
    var txtSobrenome = document.getElementById("txtSobrenome");
    var txtEmail = document.getElementById("txtEmail");
    var txtTelefone = document.getElementById("txtTelefone");
    var slcGenero = document.getElementById("slcGenero");
    var txtSenha = document.getElementById("txtSenha");

    txtNome.focus();

    buttonCadastrar.onclick = function (e) {

        e.preventDefault();

        var nome = txtNome.value;
        var sobrenome = txtSobrenome.value;
        var email = txtEmail.value;
        var telefone = txtTelefone.value;
        var genero = slcGenero.value;
        var senha = txtSenha.value;

        if (nome == "") {
            exibirMensagemErro("Informe o nome.");
        }
        else if (sobrenome == "") {
            exibirMensagemErro("Informe o sobrenome.");
        }
        else if (email == "") {
            exibirMensagemErro("Informe o E-mail.");
        }
        else if (telefone == "") {
            exibirMensagemErro("Informe o telefone.");
        }
        else if (senha == "") {
            exibirMensagemErro("Digite uma senha.");
        }
        else {
            cadastrar(nome, sobrenome, email, telefone, genero, senha);
        }
    };

    function exibirMensagemErro(mensagem) {

        var spanErro = document.getElementById("spanErro");

        spanErro.innerText = mensagem;
        spanErro.style.display = "block";

        setTimeout(function () {
            spanErro.style.display = "none";
        }, 5000);
    }

    function cadastrar(nome, sobrenome, email, telefone, genero, senha) {

        var data = JSON.stringify({
            "nome": nome,
            "sobrenome": sobrenome,
            "email": email,
            "telefone": telefone,
            "senha": senha,
            "genero": genero
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var cadastroResultado = JSON.parse(this.responseText);

                if (cadastroResultado.sucesso) {
                    localStorage.setItem("usuarioGuid", cadastroResultado.usuarioGuid);

                    window.location.href = "home.html";
                }
                else {
                    exibirMensagemErro(cadastroResultado.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:7183/api/UsuarioController/CadastroUsuario");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    };
}