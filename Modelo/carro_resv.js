export default class Carro_Resv{

    #carro_esc;
    #cod_reserva;

    constructor(carro_esc, cod_reserva){
        this.#carro_esc = carro_esc;
        this.#cod_reserva = cod_reserva;
    }

    get carro_esc(){
        return this.#carro_esc;
    }
    set carro_esc(novocarro_esc){
        this.#carro_esc = novocarro_esc;
    }

    get cod_reserva(){
        return this.#cod_reserva;
    }

    set cod_reserva(novaDesc){
        this.#cod_reserva=novaDesc;
    }



    toJSON(){
        return {
            codigo:this.#carro_esc,
            cod_reserva:this.#cod_reserva,
        }
    }
}