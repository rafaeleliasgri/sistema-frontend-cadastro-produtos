/* Este código faz:
1. Validação de usuário logado impedindo que se consiga acessar 
a página de Cadastro de Produto sem passar pelas páginas de login ou cadastro de
novo usuário.
2. Validação do preenchimento dos campos, envia dados formato JSON
para a API e recebe a resposta da API. Se o produto já existe, retorna a mensagem
de erro, com a resposta enviada pela API. Se o produto não existe e foi
corretamente cadastrado (dados inseridos pela API na tabela MySQL-Server), então
uma mensagem de confirmação é exibida e a página é redirecionada à Home.*/

window.onload = function (e) {

    var usuarioGuid = localStorage.getItem("usuarioGuid");

    if (usuarioGuid == null) {
        window.location.href = "login.html";

        alert("Ação não Permitida. Faça Login ou cadastre-se.");
    }
    else {

        var buttonCadastrar = document.getElementById("buttonCadastrar");
        var txtNomeProduto = document.getElementById("txtNomeProduto");
        var txtCodigoProduto = document.getElementById("txtCodigoProduto");
        var txtPrecoProduto = document.getElementById("txtPrecoProduto");
        var txtQuantidadeEstoque = document.getElementById("txtQuantidadeEstoque");

        txtNomeProduto.focus();

        buttonCadastrar.onclick = function (e) {

            e.preventDefault();

            var nomeProduto = txtNomeProduto.value;
            var codigoProduto = txtCodigoProduto.value;
            var precoProduto = txtPrecoProduto.value;
            var quantidadeEstoque = txtQuantidadeEstoque.value;

            if (nomeProduto == "") {
                exibirMensagemErro("Informe o nome do produto.");
            }
            else if (codigoProduto == "") {
                exibirMensagemErro("Informe o código do produto.");
            }
            else if (precoProduto == "") {
                exibirMensagemErro("Informe o preço do produto.");
            }
            else if (quantidadeEstoque == "") {
                exibirMensagemErro("Informe a quantidade em estoque.");
            }
            else if (precoProduto <= 0) {
                exibirMensagemErro("O preço do produto não pode ser 0 (zero) ou negativo.")
            }
            else if (quantidadeEstoque <= 0) {
                exibirMensagemErro("A quantidade em estoque não pode ser 0 (zero) ou negativa")
            }
            else {
                cadastrarProd(nomeProduto, codigoProduto, precoProduto, quantidadeEstoque);
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

        function cadastrarProd(nomeProduto, codigoProduto, precoProduto, quantidadeEstoque) {

            var data = JSON.stringify({
                "nomeProduto": nomeProduto,
                "codigoProduto": codigoProduto,
                "precoProduto": precoProduto,
                "quantidadeEstoque": quantidadeEstoque,
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    var cadastroProdutoResultado = JSON.parse(this.responseText);

                    if (cadastroProdutoResultado.sucesso) {
                        alert("Cadastro realizado com Sucesso!");

                        window.location.href = "home.html";
                    }
                    else {
                        exibirMensagemErro(cadastroProdutoResultado.mensagem);
                    }
                }
            });

            xhr.open("POST", "https://localhost:7183/api/UsuarioController/CadastroProduto");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
        };
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
}