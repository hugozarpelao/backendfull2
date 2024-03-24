import { Router } from "express";
import GrupoCtrl from "../Controle/grupoCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const grupoCtrl = new GrupoCtrl();
const rotaGrupo = new Router();

rotaGrupo
.get('/',grupoCtrl.consultar)
.get('/:termo', grupoCtrl.consultar)
.post('/',grupoCtrl.gravar)
.patch('/',grupoCtrl.atualizar)
.put('/',grupoCtrl.atualizar)
.delete('/',grupoCtrl.excluir);

export default rotaGrupo;