const express = require('express');
const app = express();
const indexRouter = require('./src/routers/indexRouter');

app.use('/', indexRouter);

const PORT = 8080;
app.listen(PORT, ()=>(
    console.log('app rodando na porta: ' + PORT)
));
