import CarroDAO from "../Persistencia/carroDAO.js";

export default class Carro{
    #codigo;
    #descricao;
    #precoAluguel;
    #grupo;
    

    constructor(codigo=0,descricao="", precoAluguel=0, grupo={}){
        this.#codigo=codigo;
        this.#descricao=descricao;
        this.#precoAluguel=precoAluguel;
        this.#grupo=grupo;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDesc){
        this.#descricao=novaDesc;
    }

    get precoAluguel(){
        return this.#precoAluguel;
    }

    set precoAluguel(novoPreco){
        this.#precoAluguel = novoPreco
    }

    get grupo(){
        return this.#grupo;
    }

    set grupo(novoGrupo){
        this.#grupo = novoGrupo; 
    }


    toJSON(){
        return {
            codigo:this.#codigo,
            descricao:this.#descricao,
            precoAluguel:this.#precoAluguel,
            grupo:this.#grupo
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const carroDAO = new CarroDAO();
        await carroDAO.gravar(this);
     }
 
     async excluir(){
        const carroDAO = new CarroDAO();
        await carroDAO.excluir(this);
     }
 
     async alterar(){
        const carroDAO = new CarroDAO();
        await carroDAO.atualizar(this);
     }
 
     async consultar(termo){
        const carroDAO = new CarroDAO();
        return await carroDAO.consultar(termo);
     }

}