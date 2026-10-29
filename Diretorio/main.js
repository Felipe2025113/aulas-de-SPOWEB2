// importar Fornecedor e FornecedorPessoa 

import Fornecedor from "./Fornecedor";
import FornecedorPessoa from "./FornecedorPessoa";

//criando um objeto e instanciando  no metodo construtor da classe Fornecedor 
const fornecedor = new Fornecedor("Pedro", "(11)1236-5896",)
//exibir
console.log(`dados do Fornecedor:
    Nome: ${fornecedor.getNome}
    Fone: ${fornecedor.getFone}`)

    const fornecedorpessoa = new FornecedorPessoa("matilde", "(11)1234-5678", "14.159.746-4", "12.45.41.89")
//exibir
console.log(`dados do Fornecedor:
    Nome: ${fornecedorpessoa.getNome}
    Fone: ${fornecedorpessoa.getFone}
    rg: ${fornecedorpessoa.getRG}
    cpf: ${fornecedorpessoa.getCPF}`)
