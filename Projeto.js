function autorizaVoto(dataNascimento) {
  const idade = validaData(dataNascimento.split("/"));
  if (idade > 75) {
    return "Opcional";
  } else if (idade > 17) {
    return "Obrigatório";
  } else if (idade > 15) {
    return "Opcional";
  } else {
    return "Negado";
  }
}

function validaData(dataNascimento) {
  let idade = new Date().getFullYear() - dataNascimento[2];
  console.log(idade);
  if (idade > new Date().getFullYear()) {
    console.log(idade > new Date().getFullYear());
    console.log("Idade invalida!!");
    dataNascimento = prompt("Digite sua data de nascimento novamente: ");
    validaData(dataNascimento.split("/"));
  }

  if (new Date().getMonth() < dataNascimento[1]) {
    idade--;
  } else {
    if (new Date().getMonth() == dataNascimento[1]) {
      if (new Date().getDay() < dataNascimento[0]) {
        idade--;
      }
    }
  }

  return idade;
}

function votacao(autorizacao, voto) {
  if (autorizacao === "Opcional" || autorizacao === "Obrigatório") {
    if (voto == 1) {
      opcao.candidato1++;
    } else if (voto == 2) {
      opcao.candidato2++;
    } else if (voto == 3) {
      opcao.candidato3++;
    } else if (voto == 4) {
      opcao.nulo++;
    } else if (voto == 5) {
      opcao.branco++;
    } else {
      console.log("Voto invalido!");
      while (voto < 1 || voto > 5) {
        voto = prompt(
          "1 = Candidato 1\n2 = Candidato 2\n3 = Candidato 3\n4 = Voto Nulo\n5 = Voto em Branco\nDigite seu voto: "
        );
      }
      votacao(autorizacao, voto);
    }
  } else {
    console.log("Você não pode votar!");
  }
}

function exibirResultados() {
  console.log("O resultado ficou assim: ");
  console.log(
    `Candidato 1: ${opcao.candidato1}\nCandidato 2: ${opcao.candidato2}\nCandidato 3: ${opcao.candidato3}\nNulo: ${opcao.nulo}\nBranco: ${opcao.branco}`
  );
  let ganhador = "candidato1";
  delete opcao.nulo;
  delete opcao.branco;
  for (let i in opcao) {
    if (opcao[i] > opcao[ganhador]) {
      ganhador = i;
    }
  }

  console.log(`O ganhador foi o ${ganhador}`);
}

var opcao = {
  candidato1: 0,
  candidato2: 0,
  candidato3: 0,
  nulo: 0,
  branco: 0,
};

let continuar = "S";

console.log("Bem-Vindo aos Programa Eleitoral!!!");

while (continuar[0].toUpperCase() === "S") {
  const dataNascimento = prompt(
    "Digite a sua data de nascimento com barras!\nEx: 01/01/2001\nDigite a sua data de nascimento: "
  );

  const autorizacao = autorizaVoto(dataNascimento);

  const voto = prompt(
    "1 = Candidato 1\n2 = Candidato 2\n3 = Candidato 3\n4 = Voto Nulo\n5 = Voto em Branco\nDigite seu Voto: "
  );

  votacao(autorizacao, voto);
  continuar = prompt("Deseja continuar? [S/N] ");
  while (
    continuar[0].toUpperCase() != "S" &&
    continuar[0].toUpperCase() != "N"
  ) {
    console.log("Por favor digite novamente!");
    continuar = prompt("Deseja continuar? [S/N] ");
  }
}

exibirResultados();
