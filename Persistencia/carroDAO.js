import Carro from '../Modelo/carro.js';
import Grupo from '../Modelo/grupo.js';
import conectar from './conexao.js';

export default class CarroDAO {

    async gravar(carro) {
        if (carro instanceof Carro) {
            const sql = `INSERT INTO carro(car_descricao, car_precoAluguel, grupo_codigo)
                VALUES(?,?,?)`;
            const parametros = [carro.descricao, carro.precoAluguel, carro.grupo.codigo];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            carro.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(carro) {
        if (carro instanceof Carro) {
            const sql = `UPDATE carro SET car_descricao = ?, car_precoAluguel = ?, grupo_codigo = ?
            WHERE car_codigo = ?`;
            const parametros = [carro.descricao, carro.precoAluguel, carro.grupo.codigo, carro.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(carro) {
        if (carro instanceof Carro) {
            const sql = `DELETE FROM carro WHERE car_codigo = ?`;
            const parametros = [carro.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaCarros = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do carro
            const sql = `SELECT c.car_codigo, c.car_descricao,
              c.car_precoAluguel, g.grupo_codigo, g.grupo_descricao
              FROM carro c 
              INNER JOIN grupo g ON c.grupo_codigo = g.grupo_codigo
              WHERE c.car_codigo = ?
              ORDER BY c.car_descricao               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const grupo = new Grupo(registro.grupo_codigo, registro.grupo_descricao);
                const carro = new Carro(registro.car_codigo,registro.car_descricao,
                                            registro.car_precoAluguel, grupo
                                            );
                listaCarros.push(carro);
            }
        }
        else
        {
            //consulta pela descrição do carro
            const sql = `SELECT c.car_codigo, c.car_descricao,
              c.car_precoAluguel, g.grupo_codigo, g.grupo_descricao
              FROM carro c 
              INNER JOIN grupo g ON c.grupo_codigo = g.grupo_codigo
              WHERE c.car_descricao like ?
              ORDER BY c.car_descricao               
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const grupo = new Grupo(registro.grupo_codigo, registro.grupo_descricao);
                const carro = new Carro(registro.car_codigo,registro.car_descricao,
                                            registro.car_precoAluguel, grupo
                                            );
                listaCarros.push(carro);
            }
        }
        return listaCarros;
    }
}