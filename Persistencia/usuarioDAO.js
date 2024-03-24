import Usuario from "../Modelo/usuario.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class UsuarioDAO{
    async gravar(usuario){
        if (usuario instanceof Usuario){
            const sql = "INSERT INTO usuario(nome, telefone, endereco) VALUES(?,?,?)"; 
            const parametros = [usuario.nome, usuario.telefone, usuario.endereco];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            usuario.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(usuario){
        if (usuario instanceof Usuario){
            const sql = "UPDATE usuario SET nome = ?, telefone = ?, endereco = ? WHERE codigo = ?"; 
            const parametros = [usuario.nome, usuario.telefone, usuario.endereco, usuario.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(usuario){
        if (usuario instanceof Usuario){
            const sql = "DELETE FROM usuario WHERE codigo = ?"; 
            const parametros = [usuario.codigo];
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
            //consultar total
            sql=`SELECT * from usuario`
            parametros = [parametroConsulta];
        }
        else{
            //consultar por nome
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = `SELECT * FROM usuario WHERE nome LIKE ?`
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listaUsuarios = [];
        for (const registro of registros){
            const usuario = new Usuario(registro.codigo, registro.nome, registro.telefone, registro.endereco);
            listaUsuarios.push(usuario);
        }
        return listaUsuarios;
    }
}