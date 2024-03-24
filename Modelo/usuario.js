import UsuarioDAO from "../Persistencia/usuarioDAO.js";

export default class Usuario {
    //definição dos atributos privados
    #codigo;
    #nome;
    #telefone;
    #endereco;

    constructor(codigo=0, nome, telefone, endereco){
        this.#codigo = codigo;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#endereco = endereco;
    }

    //métodos de acesso públicos

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novonome){
        this.#nome = novonome;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novotelefone){
        this.#telefone = novotelefone;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novaData){
        this.#endereco = novaData;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo : this.#codigo,
            nome : this.#nome,
            telefone : this.#telefone,
            endereco : this.#endereco
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.gravar(this);
    }

    async excluir(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.excluir(this);
    }

    async atualizar(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.atualizar(this);

    }

    async consultar(parametro){
        const usuDAO = new UsuarioDAO();
        return await usuDAO.consultar(parametro);
    }
}