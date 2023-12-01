window.onload = function (e) {

    var btnCadastrar = document.getElementById("btnCadastrar");

    var txtNomeProd = document.getElementById("txtNomeProd");

    var txtCodProd = document.getElementById("txtCodProd");

    var txtPrecProd = document.getElementById("txtPrecProd");

    var txtQuantEstoque = document.getElementById("txtQuantEstoque");

    txtNomeProd.focus();

    btnCadastrar.onclick = function (e) {

        e.preventDefault();

        var nomeProd = txtNomeProd.value;

        var codProd = txtCodProd.value;

        var precProd = txtPrecProd.value;

        var quantEstoque = txtQuantEstoque.value;

        if (nomeProd == "") {
            exibirMensagemErro("Informe o nome do produto.");
        }
        else if (codProd == "") {
            exibirMensagemErro("Informe o código do produto.");
        }
        else if (precProd == "") {
            exibirMensagemErro("Informe o preço do produto.");
        }
        else if (quantEstoque == "") {
            exibirMensagemErro("Informe a quantidade em estoque.");
        }
        else if (precProd <= 0) {
            exibirMensagemErro("O preço do produto não pode ser 0 (zero) ou negativo.")
        }
        else if (quantEstoque <= 0) {
            exibirMensagemErro("A quantidade em estoque não pode ser 0 (zero) ou negativa")
        }
        else {
            cadastrarProd(nomeProd, codProd, precProd, quantEstoque);
        }

    };

    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    }

    function cadastrarProd(nomeProd, codProd, precProd, quantEstoque) {

        // WARNING: For POST requests, body is set to null by browsers.
        var data = JSON.stringify({
            "nomeProd": nomeProd,
            "codProd": codProd,
            "precProd": precProd,
            "quantEstoque": quantEstoque,
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var cadResul = JSON.parse(this.responseText);

                if (cadResul.sucesso) {
                    localStorage.setItem("prodfGuid", cadResul.prodGuid);

                    alert("Cadastro realizado com Sucesso!");

                    window.location.href = "home.html";
                }
                else {
                    exibirMensagemErro(cadResul.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:7183/api/UsuarioController/CadastroProduto");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    };
}