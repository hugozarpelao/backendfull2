import { Router } from "express";
import UsuarioCtrl from "../Controle/usuarioCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const usuarioCtrl = new UsuarioCtrl();
const rotaUsuario = new Router();

rotaUsuario
.get('/',usuarioCtrl.consultar)
.get('/:termo', usuarioCtrl.consultar)
.post('/',usuarioCtrl.gravar)
.patch('/',usuarioCtrl.atualizar)
.put('/',usuarioCtrl.atualizar)
.delete('/',usuarioCtrl.excluir);

export default rotaUsuario;