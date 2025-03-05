const dataAtual = new Date();
const anoAtual = dataAtual.getFullYear();
const primeiraLinha = document.getElementById("Plresultado");
const segundaLinha = document.getElementById("Slresultado");
const terceiraLinha = document.getElementById("Tlresultado");

function converterDias(x){
    if(isNaN(x) || x < 0){
        terceiraLinha.textContent = "Por favor insira um número válido de dias"
        return;
    }
    let anos = 0
    let diasRestantes = x
    while (diasRestantes >= 365){
        const anoAtual = new Date().getFullYear() + anos;
        const isBissexto = (anoAtual % 4 === 0 && anoAtual % 10 !== 0) || (anoAtual % 400 === 0);

        diasRestantes -= isBissexto ? 365 : 365;
        anos++;
    }
    const meses = Math.floor(diasRestantes / 30);
    const dias = diasRestantes % 30;
    return `<strong>Resultado:</strong><br>${anos} ano(s), ${meses} mes(es) e ${dias} dia(s).` ;
}

function calcularData(diasTotais, diasDesejados) {
    if (isNaN(diasTotais) || diasTotais < 0) {
        segundaLinha.textContent = "Por favor, insira um número válido de dias.";
        return;
    }

    const diferencaDias = diasDesejados - diasTotais;
    
    // Criando uma nova instância de Date para evitar modificação global
    let novaData = new Date();
    novaData.setDate(novaData.getDate() + diferencaDias);

    const dia = String(novaData.getDate()).padStart(2, "0");
    const mes = String(novaData.getMonth() + 1).padStart(2, "0");
    const ano = novaData.getFullYear();

    return `<strong>${dia}/${mes}/${ano}</strong>.`;
}

function resultados() {
    const idade = document.getElementById("ididade").value;
    const sexo = document.getElementById("idsexo").value.toUpperCase();
    const contribuicaoTotal = Number(document.getElementById("idcontribuicaoT").value); // Pegando valor atualizado
    const diasAvb = document.getElementById("iddiassp").value;
    const diasAvbf = document.getElementById("iddiasnsp").value;

    if (sexo === "M") {
        const dataNascimentoM = anoAtual - idade;
        const ano62 = dataNascimentoM + 62;
        primeiraLinha.textContent = "Ano do aniversário de 62 anos de idade: " + ano62;
        
    } else if (sexo === "H") {
        const dataNascimentoH = anoAtual - idade;
        const ano65 = dataNascimentoH + 65;
        primeiraLinha.textContent = "Ano do aniversário de 65 anos de idade: " + ano65;
    } else {
        primeiraLinha.textContent = "Em Sexo coloque somente 'm' ou 'h'.";
    }
    const diasforaTRT = diasAvb - diasAvbf
    // Chamando as funções corretamente
    segundaLinha.innerHTML ="25 anos de contribuição: " + calcularData(contribuicaoTotal, 9125); // Para 25 anos
    terceiraLinha.innerHTML ="10 anos de contribuição: " + calcularData(contribuicaoTotal, 3652 - diasforaTRT); // Para 10 anos
}
