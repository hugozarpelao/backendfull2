//camada de interface da API que traduz HTTP
import Reserva from "../Modelo/reserva.js";

export default class ReservaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const usuario = dados.usuario;
            const data_retirada = dados.data_retirada;
            const data_devolucao = dados.data_devolucao;
            const total = dados.total;
            const carro = dados.carro;
            if (carro && usuario && data_retirada && total) {
                const reserva = new Reserva(0, usuario, data_retirada, data_devolucao, total, carro);
                //resolver a promise
                reserva.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": reserva.cod_rev,
                        "mensagem": "Reserva incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a reserva:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a reserva!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma reserva!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cod_rev = dados.cod_rev;
            const usuario = dados.usuario;
            const data_retirada = dados.data_retirada;
            const data_devolucao = dados.data_devolucao;
            const total = dados.total;
            if (cod_rev && usuario && data_retirada && total) {
                const reserva = new Reserva(cod_rev, usuario, data_retirada, data_devolucao, total);
                //resolver a promise
                reserva.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Reserva atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a reserva:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e a descrição da reserva!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma reserva!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cod_rev = dados.cod_rev;
            if (cod_rev) {
                const reserva = new Reserva(cod_rev);
                //resolver a promise
                reserva.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Reserva excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a reserva:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da reserva!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um grupo!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const reserva = new Reserva();
            reserva.consultar(termo).then((listaReservas)=>{
                resposta.json(
                    {
                        status:true,
                        listaReservas
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter as reservas: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar reservas!"
            });
        }
    }
}