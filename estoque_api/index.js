/* Importa o pacote express */ 
const express = require('express');

const db = require('./src/db');
const estoqueRouter = require('./src/routers/estoqueRouter');

/** Cria um aplicativo a partir do construtor do express */
const app = express();

app.use(express.urlencoded({extended: true}));

app.use('/', estoqueRouter);

/** Sincroniza a conexão com o banco de dados. */
db.sync(()=>{
    console.log('DB conectado.');
});

/** Declara uma porta e inicializa a execução do aplicativo na porta declarada */
const PORT = 8080;
app.listen(PORT, ()=>{
    console.log('app rodando na porta ' + PORT);
});