//importar Fornecedor 

import Fornecedor from './Fornecedor.js'

//criando a classe

class FornecedorPessoa extends Fornecedor{
    //criando atributos 
    #rg
    #cpf

    constructor(nome = "sem nome", fone = "(00) 0000-0000", rg = "", cpf = ""){
        super(nome,fone);
        this.#rg = rg
        this.#cpf = cpf
    }

    //criando os metodos setters
     setRG (rg){
        this.#rg =rg
     }
     setCPF(cpf){
        this.#cpf =cpf
     }

     //criando os getters
     getRG(rg){
        return this.#rg
     }
     getCPF(cpf){
        return this.#cpf
     }
}

export default FornecedorPessoa
