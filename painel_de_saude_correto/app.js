//Olhem o Diagrama de Classes da apostila (Etapa 2). 
//Quantas classes estão desenhadas lá? Agora abram o nosso app.js da semana passada. Cadê a classe ManipuladorDOM?
//Resposta: No diagragama de classe do projeto temos 3 classes planejadas: Cliente, PainelAPP e ManipuladorDOM, porém no nosso projeto
//temos somente 2 classes, Cliente e PainelAPP.

//Por que a classe PainelApp ficou agregada/inchada? O que ela está fazendo além de coordenar a aplicação?
//Resposta: Porque ela está assumindo várias responsabilidades. Além coordenar a aplicação, ela está gerenciando os dados, controlando os eventos,
//capturando as entradas, criando os objetos, gerenciando a interface gráfica e atualizando a tabela.

//Dificuldade de manutenção,dificuldade de realizar testes, maior risco de erros, baixa reutilização do código, violação da separação de responsabilidades,
//desorganização da estrutura definida na UML e dificuldade de expansão e evolução do sistema.



// Criando as classes de acordo com o diagrama de classe domínio

class Cliente {
    #nome;
    #altura;
    #peso;

    constructor(nome, peso, altura) {
        this.#nome = nome;
        this.#peso = Number(peso);
        this.#altura = Number(altura);
    }

    getNome() {
        return this.#nome;
    }

    getAltura() {
        return this.#altura;
    }

    getPeso() {
        return this.#peso;
    }

    calcularIMC() {
        const imc = this.#peso / (this.#altura * this.#altura);
        return Number(imc.toFixed(2));
    }

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


// Classe ManipuladorDOM
// Responsável por manipular os elementos HTML

class ManipuladorDOM {
    #form;
    #tabelaCorpo;

    constructor() {
        this.#form = document.getElementById('paciente');
        this.#tabelaCorpo = document.getElementById('tabela');
    }

    configurarEventos(callback) {
        this.#form.addEventListener('submit', (evento) => {
            evento.preventDefault();
            callback();
        });
    }

    capturarDados() {
        const nome = document.getElementById('nome').value.trim();
        const altura = document.getElementById('altura').value;
        const peso = document.getElementById('peso').value;

        return { nome, altura, peso };
    }

    limparFormulario() {
        this.#form.reset();
        document.getElementById('nome').focus();
    }

    renderizarTabela(clientes) {
        this.#tabelaCorpo.innerHTML = '';

        clientes.forEach((cliente) => {
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


// Classe PainelApp
// Responsável por coordenar a aplicação

class PainelApp {
    #clientes = [];
    #dom;

    constructor() {
        this.#dom = new ManipuladorDOM();
    }

    iniciar() {
        this.#dom.configurarEventos(() => {
            this.#cadastrarCliente();
        });
    }

    #cadastrarCliente() {
        const dados = this.#dom.capturarDados();

        const novoCliente = new Cliente(
            dados.nome,
            dados.peso,
            dados.altura
        );

        this.#clientes.push(novoCliente);

        this.#dom.renderizarTabela(this.#clientes);
        this.#dom.limparFormulario();
    }
}


// Inicialização da aplicação

const app = new PainelApp();
app.iniciar();