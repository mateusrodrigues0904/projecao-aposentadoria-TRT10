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
  const diasCorretos = 9125 - (diasAverbados - deducoes);
  let dtInicial = new Date(ingressoTRT.split("/").reverse().join("-"));
  dtInicial.setDate(dtInicial.getDate() + diasCorretos);
  return dtInicial.toLocaleDateString("pt-BR");
}

function anosDeServico10(diasAverbados, ingressoTRT) {
  let diasCorretos = 0;
  if (diasAverbados === 0) {
    diasCorretos = 3650 - diasAverbados;
  } else {
    diasCorretos = 3650 - diasAverbados - 1;
  }
  let dtInicial = new Date(ingressoTRT.split("/").reverse().join("-"));
  dtInicial.setDate(dtInicial.getDate() + diasCorretos);
  return dtInicial.toLocaleDateString("pt-BR");
}

function calcularPeriodo(dataInicial, dataFinal) {
  let dtInicial = new Date(dataInicial.split("/").reverse().join("-"));
  let dtFinal = new Date(dataFinal.split("/").reverse().join("-"));

  if (dtFinal < dtInicial) {
    return {
      erro: "A data final deve ser posterior à data inicial.",
      diasTotais: 0,
    };
  }

  let anos = dtFinal.getFullYear() - dtInicial.getFullYear();
  let meses = dtFinal.getMonth() - dtInicial.getMonth();
  let dias = dtFinal.getDate() - dtInicial.getDate();

  if (dias < 0) {
    meses--;
    dias += new Date(
      dtInicial.getFullYear(),
      dtInicial.getMonth() + 1,
      0
    ).getDate();
  }
  if (meses < 0) {
    anos--;
    meses += 12;
  }

  let diasTotais = Math.floor((dtFinal - dtInicial) / (1000 * 60 * 60 * 24));

  return { texto: `${anos} anos, ${meses} meses e ${dias} dias`, diasTotais };
}

function somarTodosOsPeriodos() {
  let totalDias = 0;
  let periodos = document.querySelectorAll("[id^=periodo]");

  periodos.forEach((periodo) => {
    let aposentaInput = periodo.querySelector("input[name^='diasAposenta']");

    if (aposentaInput) {
      let diasAposenta = Number(aposentaInput.value);
      if (diasAposenta > 0) {
        diasAposenta -= 1;
      }
      totalDias += diasAposenta > 0 ? diasAposenta : 0;
    }
  });

  return totalDias;
}

let contador = 1;
function adicionarPromptTS() {
  contador++;

  let novoPeriodo = document.createElement("div");
  novoPeriodo.id = `periodo${contador}`;
  novoPeriodo.innerHTML = `
        

        <label for="diasAposenta${contador}">Aposenta: </label>
        <input type="number" name="diasAposenta${contador}" id="diasAposenta${contador}" />
        <br /><br />
    `;

  let divPrincipal = document.getElementById("periodo10AnosServico");
  let botaoAdicionar = divPrincipal.querySelector("input[type='button']");

  divPrincipal.insertBefore(novoPeriodo, botaoAdicionar);
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

  const anosServico10 = anosDeServico10(somarTodosOsPeriodos(), ingressoTRT);
  document.getElementById(
    "id10AnosServicoPublico"
  ).innerHTML = `10 anos de efetivo exercicio público: ${anosServico10}`;
}
