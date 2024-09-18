const User = require('../models/user');
const bcrypt = require('bcrypt');

// Exibe a página de login
exports.getLoginPage = (req, res) => {
  res.render('login');
};

// Exibe a página de cadastro
exports.getRegisterPage = (req, res) => {
  res.render('register');
};

// Registra um novo usuário
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.status(500).render('register', { message: 'Erro ao cadastrar o usuário.' });
  }
};

// Autentica o usuário
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).render('login', { message: 'Credenciais inválidas.' });
    }

    req.session.userId = user.id;
    res.redirect('/auth/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('login', { message: 'Erro ao fazer login.' });
  }
};

// Exibe o dashboard após o login
exports.getDashboard = (req, res) => {
  const user = req.user;
  res.render('dashboard', { username: user.username, userId: user.id });
};

// Faz logout do usuário
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};
