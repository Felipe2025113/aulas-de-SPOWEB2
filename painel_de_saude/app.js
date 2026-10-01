// Criando as classes de acordo com o diagrama de classe domínio

class Cliente {
    // Criando atributos privados
    #nome;
    #altura;
    #peso;

    // Método construtor
    constructor(nome, peso, altura) {
        // Atributo = conteúdo do parâmetro
        this.#nome = nome;
        this.#peso = Number(peso);
        this.#altura = Number(altura);
    }

    // Métodos Getters: provedor de acesso somente para leitura
    getNome() {
        return this.#nome;
    }

    getAltura() {
        return this.#altura;
    }

    getPeso() {
        return this.#peso;
    }

    // Regra de negócio: calcular o índice de massa corporal
    // IMC = peso / (altura * altura)
    calcularIMC() {
        const imc = this.#peso / (this.#altura * this.#altura);
        return Number(imc.toFixed(2));
    }

    // Definir classificação do IMC
    definirClassificacao() {
        const imc = this.calcularIMC();

        switch (true) {
            case (imc < 18.5):
                return 'Abaixo do peso';

            case (imc >= 18.5 && imc <= 24.9):
                return 'Peso normal';

            case (imc >= 25.0 && imc <= 29.9):
                return 'Sobrepeso';

            case (imc >= 30.0 && imc <= 34.9):
                return 'Obesidade grau I';

            case (imc >= 35.0 && imc <= 39.9):
                return 'Obesidade grau II';

            default:
                return 'Obesidade grau III';
        }
    }
}


// Criando a classe PainelApp
// Responsabilidade:
// - Trabalhar/orquestrar a interface gráfica (GUI)
// - Gerenciar a lista de clientes na memória
// - Coordenar as entradas

class PainelApp {

    // Atributos privados
    #clientes = [];
    #form;
    #tabelaCorpo;

    // Método construtor
    constructor() {
        this.#form = document.getElementById('form-paciente');
        this.#tabelaCorpo = document.getElementById('tabela-pacientes-corpo');
    }

    // Ponto de inicialização da aplicação
    iniciar() {
        this.#configurarEventos();
    }

    // Registrar os listeners de eventos
    #configurarEventos() {
        this.#form.addEventListener('submit', (evento) => {
            this.#cadastrarCliente(evento);
        });
    }

    // Tratando o envio do formulário
    #cadastrarCliente(evento) {
        evento.preventDefault();

        // Capturar os valores digitados
        const nomeInput = document.getElementById('nome').value.trim();
        const alturaInput = document.getElementById('altura').value;
        const pesoInput = document.getElementById('peso').value;

        // Instanciando objeto de negócio
        const novoCliente = new Cliente(
            nomeInput,
            pesoInput,
            alturaInput
        );

        // Adicionar na coleção interna
        this.#clientes.push(novoCliente);

        // Atualizar a visualização na tabela
        this.#renderizarTabela();

        // Limpar os campos do formulário
        this.#form.reset();
        document.getElementById('nome').focus();
    }

    // Renderizar a tabela no DOM
    #renderizarTabela() {

        // Limpar tabela
        this.#tabelaCorpo.innerHTML = '';

        // Iteração sobre as instâncias
        this.#clientes.forEach((cliente) => {

            const linha = document.createElement('tr');

            linha.innerHTML = `
                <td>${cliente.getNome()}</td>
                <td>${cliente.getAltura().toFixed(2)}</td>
                <td>${cliente.getPeso().toFixed(1)}</td>
                <td>${cliente.calcularIMC()}</td>
                <td>${cliente.definirClassificacao()}</td>
            `;

            this.#tabelaCorpo.appendChild(linha);
        });
    }
}
