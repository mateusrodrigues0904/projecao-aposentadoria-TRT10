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
  if (
    Number(document.getElementById("idDiasAverbados").value) === 0 ||
    document.getElementById("idIngressoTRT").value ===
      document.getElementById("id10anosServico1Inicio").value
  ) {
    diasCorretos = 3650;
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
    let dataInicio = periodo.querySelector(
      "input[name^='10anosServico'][name$='Inicio']"
    ).value;
    let dataFim = periodo.querySelector(
      "input[name^='10anosServico'][name$='Fim']"
    ).value;

    if (dataInicio && dataFim) {
      let resultado = calcularPeriodo(
        dataInicio.split("-").reverse().join("/"),
        dataFim.split("-").reverse().join("/")
      );

      if (!resultado.erro) {
        // Correção aqui
        totalDias += resultado.diasTotais;
        console.log(
          `Período: ${resultado.texto} (Total: ${resultado.diasTotais} dias)`
        );
      }
    }
  });

  return totalDias; // Retorna o total de dias calculado
}

let contador = 1;
function adicionarPromptTS() {
  contador++;

  let novoPeriodo = document.createElement("div");
  novoPeriodo.id = `periodo${contador}`;
  novoPeriodo.innerHTML = `<label for="10anosServico${contador}Inicio">Data início serviço público: </label>
        <input type="date" name="10anosServico${contador}Inicio" id="id10anosServico${contador}Inicio" />
        <br /><br />
        <label for="10anosServico${contador}Fim">Data fim serviço público: </label>
        <input type="date" name="10anosServico${contador}Fim" id="id10anosServico${contador}Fim" />
        <br /><br />`;

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
