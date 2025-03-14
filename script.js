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

function anosDeServico25(diasAverbados, ingressoTRT) {
  const diasCorretos = 9125 - diasAverbados;
  let dtInicial = new Date(ingressoTRT.split("/").reverse().join("-"));
  dtInicial.setDate(dtInicial.getDate() + diasCorretos);
  return dtInicial.toLocaleDateString("pt-BR");
}

function enviar() {
  const dataNascimento = document.getElementById("idDataNascimento").value;
  const genero = document.getElementById("idGenero").value.toUpperCase();
  const diasAverbados = document.getElementById("idDiasAverbados").value;
  const ingressoTRT = document.getElementById("idIngressoTRT").value;

  const pIdadeAposentadoria = document.getElementById("idIdadeAposentadoria");
  pIdadeAposentadoria.innerHTML =
    "Idade de aposentadoria: " + idadeAposentadoria(dataNascimento, genero);
  const p25AnosServico = document.getElementById("Id25AnosDeContribuicao");
  p25AnosServico.innerHTML =
    "25 anos de Contribuição em: " +
    anosDeServico25(diasAverbados, ingressoTRT);
}
