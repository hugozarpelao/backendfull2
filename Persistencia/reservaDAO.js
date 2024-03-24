import Carro_Resv from "../Modelo/carro_resv.js";
import Carro from "../Modelo/carro.js";
import Reserva from "../Modelo/reserva.js";
import Usuario from "../Modelo/usuario.js"
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class ReservaDAO {
    async gravar(reserva) {
        if (reserva instanceof Reserva) {
            const sql = "INSERT INTO reserva(cod_usuario, data_retirada, data_devolucao, total) VALUES(?,?,?,?)";
            const parametros = [reserva.usuario, reserva.data_retirada, reserva.data_devolucao, reserva.total];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql, parametros); //prepara a sql e depois executa
            reserva.cod_rev = retorno[0].insertId;
            const sql2 = 'INSERT INTO carro_resv(carro_esc, cod_reserva) VALUES(?,?)'
            for (const carro of reserva.carro) {
                const parametro2 = [carro.carro_esc, reserva.cod_rev]
                await conexao.execute(sql2, parametro2);
            }
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(reserva) {
        if (reserva instanceof Reserva) {
            const sql = "UPDATE reserva SET cod_usuario = ?, data_retirada = ?, data_devolucao = ?, total = ? WHERE cod_rev = ?";
            const parametros = [reserva.usuario, reserva.data_retirada, reserva.data_devolucao, reserva.total, reserva.cod_rev];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql, parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(reserva) {
        if (reserva instanceof Reserva) {
            const sql = "DELETE FROM reserva WHERE cod_rev = ?";
            const parametros = [reserva.cod_rev];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql, parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))) {
            //consultar pelo código
            sql = `SELECT * FROM reserva r 
                INNER JOIN usuario u ON r.cod_usuario = u.codigo
                INNER JOIN carro_resv c ON r.cod_rev = c.cod_reserva
                INNER JOIN carro ca ON c.carro_esc = ca.car_codigo
                WHERE r.cod_rev = ?`
            parametros = [parametroConsulta];
            const conexao = await conectar();
            const [registros, campos] = await conexao.execute(sql, parametros);
            let listaReservas = [];
            let listaCarros = [];
            const usuario = new Usuario(registros[0].codigo, registros[0].nome, registros[0].telefone, registros[0].endereco);
            for (const registro of registros) {
                const carro = new Carro(registro.car_codigo, registro.car_descricao, registro.car_precoAluguel, registro.grupo_codigo);
                const carro_resv = new Carro_Resv(carro, registro.cod_reserva);
                listaCarros.push(carro_resv);
            }
            const reserva = new Reserva(registros[0].cod_rev, usuario, registros[0].data_retirada, registros[0].data_devolucao, registros[0].total, listaCarros);
            listaReservas.push(reserva)
            return listaReservas;
        }
        else {
            //consulta sem parametro
            sql = `SELECT * FROM reserva r
                INNER JOIN usuario u ON r.cod_usuario = u.codigo`
            const conexao = await conectar();
            const [registros, campos] = await conexao.execute(sql, parametros);
            let listaReservas = [];
            for (const registro of registros) {
                const usuario = new Usuario(registro.codigo, registro.nome, registro.telefone, registro.endereco);
                const reserva = new Reserva(registro.cod_rev, usuario, registro.data_retirada, registro.data_devolucao, registro.total);
                listaReservas.push(reserva);
            }
            
            return listaReservas;
        }

    }
}