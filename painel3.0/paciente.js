class Paciente{
    #nome
    #altura
    #peso
    #cidade

    constructor(nome = "", altura = 0, peso = 0, cidade = ""){
        this.#nome = nome
        this.#altura = parseFloat(altura)
        this.#peso = parseFloat(peso)
        this.#cidade = cidade
        this.#cidade = cidade
    }

    get nome() { return this.#nome }
    set nome(valor) { this.#nome = valor }

    get altura() { return this.#altura }
    set altura(valor) { this.#altura = valor }

    get peso() { return this.#peso }
    set peso(valor) { this.#peso = valor }

    get cidade() { return this.#cidade }
    set cidade(valor) { this.#cidade = valor }

    calcularIMC(){
        if (this.#altura <= 0) return 0
        return this.#peso / (this.#altura * this.#altura)
    }

    definirClassificacao(){
        const imc = this.calcularIMC()
        if (imc < 18.5) return "Abaixo do peso"
        if (imc < 25) return "Peso normal"
        if (imc < 30) return "Sobrepeso"
        return "Obesidade"
    }
}
export default Paciente