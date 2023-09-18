// #region Variáveis
const numerosApostados = []
const resultado = []
let valorAposta = 0
let qtdAcertos = 0
// #endregion

// #region Desabilita o botão apostar
const btnApostar = document.getElementById("btnApostar")
btnApostar.disabled = true
// #endregion

// #region Chama a função que sorteia os números
sortearNumeros()
// #endregion

// #region Funçoes
function sortearNumeros() {
  // sorteando os números do jogo
  let numerosSorteados = []

  let groups = []

  let timeInSeconds = new Date().getTime() / 1000

  for (let i = 1; i <= 60; i++) {
    let groupIndex = Math.floor((i - 1) / 10)

    if (!groups[groupIndex]) {
      groups[groupIndex] = []
    }

    let number = i.toString().padStart(2, "0")
    groups[groupIndex].push(number)
  }

  for (let i = 0; i < groups.length; i++) {
    let shiftSeconds = i * 10 + timeInSeconds

    for (let j = groups[i].length - 1; j > 0; j--) {
      let randomIndex = Math.floor((shiftSeconds + j) % (j + 1))
      let temp = groups[i][j]
      groups[i][j] = groups[i][randomIndex]
      groups[i][randomIndex] = temp
    }
  }

  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor((timeInSeconds + i) % groups[i].length)
    numerosSorteados.push(groups[i][randomIndex])
  }

  // verifica se o número sorteado existe na lista, enquanto existir ele vai sortear um novo número
  while (resultado.includes(numerosSorteados)) {
    numerosSorteados = []
    for (let i = 0; i < 6; i++) {
      let numeroSorteado = Math.floor(Math.random() * 60) + 1
      if (!numerosSorteados.includes(numeroSorteado)) {
        numerosSorteados.push(numeroSorteado)
      }
    }
  }

  resultado.push(...numerosSorteados) // insere os números sorteados na lista
}

function selecionarNumeros(numero) {
  if (numerosApostados.length >= 0 && numerosApostados.length < 6) {
    // adiciona o número na lista
    numerosApostados.push(numero)

    // desabilita o numero escolhido
    desabilitarNumeroEscolhido(numero)

    // habilita o botão apostar
    if (numerosApostados.length >= 6) {
      btnApostar.disabled = false

      // mostra o valor da aposta
      valorDaAposta()
    }

    // mostrar quantidade de números apostados
    const qtdApostas = document.getElementById("qtdNumeros")
    qtdApostas.innerHTML =
      "<p>Qtd Números</p><p class='valor'>" + numerosApostados.length + "</p>"
  }
}

function desabilitarNumeroEscolhido(numero) {
  document.getElementById("num_" + numero).disabled = true
  document.getElementById("num_" + numero).style.background = "#5cd1fd"
  document.getElementById("num_" + numero).style.color = "#ffffff"
}

function valorDaAposta() {
  switch (numerosApostados.length) {
    case 6:
      valorAposta = "R$ 4,50"
      break

    default:
      valorAposta = "R$ 0,00"
      break
  }
  const divValorAposta = document.getElementById("valor")
  divValorAposta.innerHTML =
    "<p>valor da Aposta</p><p class='valor'>" + valorAposta + "</p>"
}

function apostar() {
  // fazer a aposta - compara os números sorteados com os apostados
  for (i = 0; i < numerosApostados.length; i++) {
    if (resultado.includes(numerosApostados[i])) {
      qtdAcertos++
    }
  }

  // mostrar o resultado
  const divResultado = document.getElementById("resultado")
  for (i = 0; i < resultado.length; i++) {
    divResultado.innerHTML +=
      "<div class='resultadoCircle'>" + resultado[i] + "</div>"
  }

  // Mostrar a quantidade de acertos
  let divAcertos = document.getElementById("acertos")
  divAcertos.innerHTML = "<p>Acertos</p><p class='valor'>" + qtdAcertos + "</p>"

  // desabilitar todos os botões
  desabilitarTodosNumeros()

  // esconder o botão apostar
  btnApostar.style.display = "none"

  // habilitar o botão reiniciar
  document.getElementById("btnReiniciar").style.display = "inline"
}

function desabilitarTodosNumeros() {
  for (i = 1; i <= 60; i++) {
    document.getElementById("num_" + i).disabled = true
  }
}

let btn = document.querySelector("#btnReiniciar")
btn.addEventListener("click", function () {
  location.reload()
})
