//importar Fornecedor
import Fornecedor from './Fornecedor.js'

//criando a classe
class FornecedorPessoa extends Fornecedor{
    constructor(nome="Sem nome", fone="(00)0000-0000", rg="", cpf=""){
        super(nome,fone)
        this.#rg = rg
        this.#cpf = cpf
    }
}