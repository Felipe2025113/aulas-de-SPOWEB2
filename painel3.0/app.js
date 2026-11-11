import Paciente from './Paciente.js'
import PacienteConvenio from './PacienteConvenio.js'

const form = document.getElementById('formPaciente')
const tipoPacienteSelect = document.getElementById('tipoPaciente')
const groupCarteirinha = document.getElementById('groupCarteirinha')
const carteirinhaInput = document.getElementById('carteirinha')
const cepInput = document.getElementById('cep')
const cidadeInput = document.getElementById('cidade')
const tabelaPacientes = document.getElementById('tabelaPacientes')

tipoPacienteSelect.addEventListener('change', () => {
    if (tipoPacienteSelect.value === 'Convenio'){
        groupCarteirinha.style.display = 'flex'
        carteirinhaInput.setAttribute('required', 'true')
    } else {
        groupCarteirinha.style.display = 'none'
        carteirinhaInput.removeAttribute('required')
        carteirinhaInput.value = ''
    }
})

cepInput.addEventListener('blur', async () => {
    const cepLimpo = cepInput.value.replace(/\D/g, '')

    if (cepLimpo.length !== 8) {
        if (cepLimpo.length > 0) {
            alert('CEP inválido! O CEP deve conter exatamente 8 dígitos numéricos.')
            cepInput.value = ''
            cidadeInput.value = ''
        }
        return
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const dados = await response.json()

        if (dados.erro) {
            alert('O CEP informado não foi encontrado na base de dados.')
            cepInput.value = ''
            cidadeInput.value = ''
        } else {
            
            cidadeInput.value = `${dados.localidade} / ${dados.uf}`
        }
    } catch (error) {
        alert('Erro ao consultar o serviço de CEP. Verifique sua conexão.')
        console.error('Erro na requisição:', error)
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const nome = document.getElementById('nome').value.trim()
    const tipo = tipoPacienteSelect.value
    const cidade = cidadeInput.value
    const altura = parseFloat(document.getElementById('altura').value)
    const peso = parseFloat(document.getElementById('peso').value)
    const carteirinha = carteirinhaInput.value.trim()

    
    if (altura <= 0 || peso <= 0) {
        alert('Por favor, informe valores positivos e válidos para peso e altura.')
        return
    }

    if (!cidade) {
        alert('Por favor, insira um CEP válido para carregar sua Cidade/UF.')
        return
    }

    let paciente

    
    if (tipo === 'Convenio') {
        paciente = new PacienteConvenio(nome, altura, peso, cidade, carteirinha)
    } else {
        paciente = new Paciente(nome, altura, peso, cidade)
    }

    const novaLinha = document.createElement('tr')
    
    novaLinha.innerHTML = `
        <td>${paciente.nome}</td>
        <td>${tipo === 'Convenio' ? `Convênio (${paciente.carteirinha})` : 'Particular'}</td>
        <td>${paciente.cidade}</td>
        <td>${paciente.altura.toFixed(2)} m</td>
        <td>${paciente.peso.toFixed(1)} kg</td>
        <td><strong>${paciente.calcularIMC().toFixed(2)}</strong></td>
        <td>${paciente.definirClassificacao()}</td>
    `

    tabelaPacientes.appendChild(novaLinha)

    
    form.reset()
    groupCarteirinha.style.display = 'none' 
    carteirinhaInput.removeAttribute('required')
    document.getElementById('nome').focus() 
})
