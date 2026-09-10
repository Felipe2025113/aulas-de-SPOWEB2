//Criando as classes de acordo com o diagrama de classe dominio

class Cliente {
    //criando atributos
    #nome;
    #altura;
    #peso;

    //método construtuor padrão
    constructor(nome, peso, altura) {
        //atributo = conteúdo do parâmetro
        this.#nome = nome;
        this.#peso = Number(peso);
        this.#altura = Number(altura);
    }

    //métodos Getterr: provedor de acesso somente para leitura
    getNome() {
        return this.#nome;
    }

    getAltura() {
        return this.#altura;
    }

    getPeso() {
        return this.#peso;
    }

    //regra de negócio: Calcular o indice de massa corporal
    //formulario -> peso / (altura*altura)
    //.toFixed(2)
    calcularIMC() {
        const imc = this.#peso / (this.#altura * this.#altura)
        return Number(imc.toFixed(2))
    }

    //criar o método definirClassificacao()
    definirClassificacao() {
        const imc = this.calcularIMC()

        switch (true) {
            case (imc < 19.5):
                return 'Abaixo do peso'
            case (imc >= 18.5 && imc <= 24.9):
                return 'Peso normal'
            case (imc >= 25.0 && imc <= 29.9):
                return 'Sobrepeso'
            case (imc >= 30.0 && imc <= 34.9):
                return 'Obsidade grau I'
            case (imc >= 35.0 && imc <= 39.9):
                return 'Obsidade grau II'
            default:
                return 'Obsidade grau III' //qualquer valor acima de 40.0
        }

    }
}

//criando a classe PainelApp
//responsabilidade: trabalahr/orquestrar a interface gráfica(GUI), gerenciar a lista de clientes na memória, coordenar as entradas

//criar a classe
class PainelApp {
    //criando as propriedades / atributos privados de estado e DOM
    #cliente = [] //array que armazena as instânicas
    #form //referência ao elemento <form>
    #tableCorpo //referência o elemento <tbody> da tabela

    //criando a método construtor
    constructor(){
        this.#form = document.getElementById('form-paciente')
        this.#tableCorpo = document.getElementById('tabela-pacientes-corpo')
    }
}
