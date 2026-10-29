//criando a classe Fornecedor 
class Fornecedor {
    //criando os atributos 
    #nome;
    #fone;

    //criando o construtor 

    constructor() {
        this.#nome = "sem nome"
        this.#fone = '(00) 0000-0000'
    }
    constructor(nome, fone) {
        this.#nome = nome
        this.#fone = fone
    }

    //criando  os metodos setters
    
    setNome(nome){
        this.#nome = nome
    }
    setFone(fone){
        this.#fone = fone
    }

    //criando os metodos getters
    getNome(nome){
        return this.#nome 
    }
    getFone(fone){
        return this.#fone
    }
}
export default Fornecedor
