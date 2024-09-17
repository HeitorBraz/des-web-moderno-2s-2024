const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });
    res.json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar usuário' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    res.json({ message: `Bem-vindo ${username}!` });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login' });
  }
};
