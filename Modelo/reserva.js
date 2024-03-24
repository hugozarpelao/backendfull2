import ReservaDAO from "../Persistencia/reservaDAO.js";

export default class Reserva {
    //definição dos atributos privados
    #cod_rev;
    #usuario;
    #data_retirada;
    #data_devolucao;
    #total;
    #carro;

    constructor(cod_rev=0, usuario, data_retirada, data_devolucao, total, carro=0){
        this.#cod_rev = cod_rev;
        this.#usuario = usuario;
        this.#data_retirada = data_retirada;
        this.#data_devolucao = data_devolucao;
        this.#total= total;
        this.#carro = carro;
    }

    //métodos de acesso públicos

    get cod_rev(){
        return this.#cod_rev;
    }

    set cod_rev(novoCodigo){
        this.#cod_rev = novoCodigo;
    }

    get usuario(){
        return this.#usuario;
    }

    set usuario(novoUsuario){
        this.#usuario = novoUsuario;
    }

    get data_retirada(){
        return this.#data_retirada;
    }

    set data_retirada(novaData){
        this.#data_retirada = novaData;
    }

    get data_devolucao(){
        return this.#data_devolucao;
    }

    set data_devolucao(novaData){
        this.#data_devolucao = novaData;
    }

    get total(){
        return this.#total;
    }

    set total(novoTotal){
        this.#total = novoTotal;
    }

    get carro(){
        return this.#carro;
    }

    set carro(novoCarro){
        this.#carro = novoCarro;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            cod_rev : this.#cod_rev,
            usuario : this.#usuario,
            data_retirada : this.#data_retirada,
            data_devolucao : this.#data_devolucao,
            total : this.#total,
            carro : this.#carro
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const revDAO = new ReservaDAO();
        await revDAO.gravar(this);
    }

    async excluir(){
        const revDAO = new ReservaDAO();
        await revDAO.excluir(this);
    }

    async atualizar(){
        const revDAO = new ReservaDAO();
        await revDAO.atualizar(this);

    }

    async consultar(parametro){
        const revDAO = new ReservaDAO();
        return await revDAO.consultar(parametro);
    }
}