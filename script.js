async function buscaEndereco(cep) { //Criando uma função assincrona
    var mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";
    try{
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`); //Trazendo uma API
        var consultaCEPConvertida = await consultaCEP.json(); //Convertendo o endereço do cep para json

        if (consultaCEPConvertida.erro) { //se der erro no cep, mostra no console
            throw Error("CEP não existente!")
        }
        var cidade = document.getElementById("cidade") //Puxou pelo id do elemento cidade
        var logradouro = document.getElementById("endereco") //Puxou pelo id do elemento endereço
        var estado = document.getElementById("estado") //Puxou pelo id do elemento estado

        cidade.value = consultaCEPConvertida.localidade; //completa com o valor da cidade
        logradouro.value = consultaCEPConvertida.logradouro; //completa com o valor do logradouro
        estado.value = consultaCEPConvertida.uf; //completa com o valor da cidade do estado

        console.log(consultaCEPConvertida); //Mostrando o endereço do cep no console
        return consultaCEPConvertida; //retorna o endereço do cep
    }catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente, com ceps de apenas 8 dígitos!</p>`
        console.log(erro)
    }
}

var cep = document.getElementById("cep"); //Puxou com o id do elemento
cep.addEventListener("focusout", () => buscaEndereco(cep.value)); //se o usuario clicar fora, tira o foco e manda os valores do endereço do cep