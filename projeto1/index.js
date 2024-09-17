const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const sequelize = require('./src/config/database');

// Roteadores
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = 3000;

// Configurações
app.use(bodyParser.json());
app.use(session({
  secret: 'secrettoken',
  resave: false,
  saveUninitialized: true,
}));

// Servindo arquivos estáticos da pasta 'views'
app.use(express.static(path.join(__dirname, 'src/views')));

// Uso das Rotas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com banco de dados SQLite estabelecida.');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
