function idadeAposentadoria(dataNascimento, genero) {
  const [ano, mes, dia] = dataNascimento.split("-").map(Number);
  let data = new Date(ano, mes - 1, dia);

  const anosParaAdicionar = genero === "M" ? 65 : genero === "F" ? 62 : null;

  if (anosParaAdicionar === null) {
    alert("Digite um valor válido (M ou F)");
    return "";
  }

  data.setFullYear(data.getFullYear() + anosParaAdicionar);
  return data.toLocaleDateString("pt-br");
}

function anosDeServico25(diasAverbados, ingressoTRT, deducoes) {
  const diasCorretos = 9125 - (diasAverbados -- deducoes);
  let dtInicial = new Date(ingressoTRT.split("/").reverse().join("-"));
  dtInicial.setDate(dtInicial.getDate() + diasCorretos);
  return dtInicial.toLocaleDateString("pt-BR");
}

function calcularPeriodo(dataInicial, dataFinal) {
  let dtInicial = new Date(dataInicial.split('/').reverse().join('-'));
  let dtFinal = new Date(dataFinal.split('/').reverse().join('-'));
  
  if (dtFinal < dtInicial) {
      return "A data final deve ser posterior à data inicial.";
  }
  
  let anos = dtFinal.getFullYear() - dtInicial.getFullYear();
  let meses = dtFinal.getMonth() - dtInicial.getMonth();
  let dias = dtFinal.getDate() - dtInicial.getDate();
  
  if (dias < 0) {
      meses--;
      dias += new Date(dtInicial.getFullYear(), dtInicial.getMonth() + 1, 0).getDate();
  }
  if (meses < 0) {
      anos--;
      meses += 12;
  }
  
  let diasTotais = Math.floor((dtFinal - dtInicial) / (1000 * 60 * 60 * 24));
  
  return `${anos} anos, ${meses} meses e ${dias} dias\nTotal de dias: ${diasTotais} dias`;
}

function enviar() {
  const dataNascimento = document.getElementById("idDataNascimento").value;
  const genero = document.getElementById("idGenero").value.toUpperCase();
  const diasAverbados = document.getElementById("idDiasAverbados").value;
  const ingressoTRT = document.getElementById("idIngressoTRT").value;
  const deducoes = document.getElementById("idDeducoes").value;

  const pIdadeAposentadoria = document.getElementById("idIdadeAposentadoria");
  pIdadeAposentadoria.innerHTML =
    "Idade de aposentadoria: " + idadeAposentadoria(dataNascimento, genero);
  const p25AnosServico = document.getElementById("Id25AnosDeContribuicao");
  p25AnosServico.innerHTML =
    "25 anos de Contribuição em: " +
    anosDeServico25(diasAverbados, ingressoTRT, deducoes);
}
