const form = document.getElementById('form-atividade')
const atividades = []
const notas = []
const notaMinimaParaAprovar = parseInt(prompt("digite a nota minima para ser aprovado"))

function aprovadoOuReprovado(nota) {
  return `<img src="./images/${nota}.png" />`
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  adicionaLinha()
  calculaMediaFinal()
  atualizaMediaFinal()
})

function adicionaLinha() {
  const inputNomeAtividade = document.getElementById('nome-atividade')
  const inputNotaAtividade = document.getElementById('nota-atividade')

  if(atividades.includes(inputNomeAtividade.value)) {
    alert(`A atividade ${inputNomeAtividade.value} Já foi inserida`)
  } else {
    const alunoFoiAprovado = inputNotaAtividade.value >= notaMinimaParaAprovar 
    ? 'aprovado' 
    : 'reprovado'

    let linha = 
    `<tr>
      <td>${inputNomeAtividade.value}</td>
      <td>${inputNotaAtividade.value}</td>
      <td>${aprovadoOuReprovado(alunoFoiAprovado)}</td>
    </tr>`
  
    atualizaTabela(linha)
    acrescentaArray(inputNomeAtividade.value, inputNotaAtividade.value)
  }

  // let linha = '<tr>'
  // linha += `<td>${inputNomeAtividade.value}</td>`
  // linha += `<td>${inputNotaAtividade.value}</td>`
  // linha += `<td>${alunoFoiAprovado}</td>`
  // linha += `</tr>`

  inputNomeAtividade.value = ''
  inputNotaAtividade.value = ''
}

function atualizaTabela(linha) {
  const corpoTabela = document.querySelector('tbody')
  corpoTabela.innerHTML += linha
}

function acrescentaArray(valorAtividades, valorNotas) {
  atividades.push(valorAtividades)
  notas.push(parseFloat(valorNotas))
}

function calculaMediaFinal() {
  let somasDasNotas = 0

  for (let i = 0; i < notas.length; i++) {
    somasDasNotas += notas[i]
  }
  
  return somasDasNotas / notas.length
}

function atualizaMediaFinal() {
  const mediaFinal = calculaMediaFinal()
  const spanAprovado = `<span class="resultado aprovado">Aprovado</span>`
  const spanReprovado = `<span class="resultado reprovado">Reprovado</span>`

  const alunoFoiAprovado = mediaFinal >= notaMinimaParaAprovar 
    ? spanAprovado
    : spanReprovado

    console.log(mediaFinal);
  document.getElementById('media-final-valor').innerHTML = (mediaFinal.toFixed(2))
  document.getElementById('media-final-resultado').innerHTML = alunoFoiAprovado
}