import Grupo from "../Modelo/grupo.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class GrupoDAO{
    async gravar(grupo){
        if (grupo instanceof Grupo){
            const sql = "INSERT INTO grupo(grupo_descricao) VALUES(?)"; 
            const parametros = [grupo.descricao];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            grupo.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(grupo){
        if (grupo instanceof Grupo){
            const sql = "UPDATE grupo SET grupo_descricao = ? WHERE grupo_codigo = ?"; 
            const parametros = [grupo.descricao, grupo.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(grupo){
        if (grupo instanceof Grupo){
            const sql = "DELETE FROM grupo WHERE grupo_codigo = ?"; 
            const parametros = [grupo.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código do grupo
            sql='SELECT * FROM grupo WHERE grupo_codigo = ? order by grupo_descricao';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM grupo WHERE grupo_descricao like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaGrupos = [];
        for (const registro of registros){
            const grupo = new Grupo(registro.grupo_codigo,registro.grupo_descricao);
            listaGrupos.push(grupo);
        }
        return listaGrupos;
    }
}