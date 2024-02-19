import { Router } from "express";
import CarroCtrl from "../Controle/carroCtrl.js";

const carroCtrl = new CarroCtrl();
const rotaCarro = new Router();

rotaCarro
.get('/', carroCtrl.consultar)
.get('/:termo', carroCtrl.consultar)
.post('/', carroCtrl.gravar)
.patch('/', carroCtrl.atualizar)
.put('/', carroCtrl.atualizar)
.delete('/', carroCtrl.excluir);

export default rotaCarro;