const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const sequelize = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const User = require('./src/models/user');

const app = express();
const PORT = 3000;

// Configura Mustache como engine de views
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware para parsing do body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src/public')));

// Configura a sessão
app.use(session({
  secret: 'secreta',
  resave: false,
  saveUninitialized: true
}));

// Middleware para autenticação
app.use(async (req, res, next) => {
  if (req.session && req.session.userId) {
    const user = await User.findByPk(req.session.userId);
    if (user) {
      req.user = user;
      next();
    } else {
      res.redirect('/auth/login');
    }
  } else {
    next();
  }
});

// Rota para a página inicial
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// Usando as rotas de autenticação e de usuário
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados SQLite estabelecida.');
    sequelize.sync();  // Gera o arquivo database.sqlite
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
