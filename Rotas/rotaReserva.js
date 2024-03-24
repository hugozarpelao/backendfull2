import { Router } from "express";
import ReservaCtrl from "../Controle/reservaCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const reservaCtrl = new ReservaCtrl();
const rotaReserva = new Router();

rotaReserva
.get('/',reservaCtrl.consultar)
.get('/:termo', reservaCtrl.consultar)
.post('/',reservaCtrl.gravar)
.patch('/',reservaCtrl.atualizar)
.put('/',reservaCtrl.atualizar)
.delete('/',reservaCtrl.excluir);

export default rotaReserva;