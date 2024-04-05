import express from 'express';
import cors from 'cors';
import rotaGrupo from './Rotas/rotaGrupo.js';
import rotaCarro from './Rotas/rotaCarro.js';
import dotenv from 'dotenv';
import session from 'express-session';
import rotaLogin from './Rotas/rotaLogin.js';
import rotaReserva from './Rotas/rotaReserva.js';
import rotaUsuario from './Rotas/rotaUsuario.js';
import { verificarAcesso } from './Seguranca/autenticacao.js';

const host='localhost';
const porta='4000';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    cookie: { secure: true }
}))

app.use('/login', rotaLogin);
app.use('/grupo',/*verificarAcesso,*/rotaGrupo);
app.use('/carro',/*verificarAcesso,*/rotaCarro);
app.use('/reserva',/*verificarAcesso,*/rotaReserva);
app.use('/usuario',/*verificarAcesso,*/rotaUsuario);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
