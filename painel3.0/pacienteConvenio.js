import Paciente from "./Paciente.js";

class PacienteConvenio extends Paciente{
    #carteirinha

    constructor(nome, altura, peso, cidade, carteirinha){
        super(nome,altura,peso,cidade)
        this.carteirinha = carteirinha
    }

    get Carterinha() { return this.#carteirinha }
    set Carterinha(carteirinha) { return this.#carteirinha = carteirinha }
}

export default PacienteConvenio
