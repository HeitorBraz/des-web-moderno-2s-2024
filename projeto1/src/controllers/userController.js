const User = require('../models/user');

// Exibe o perfil do usuário autenticado
exports.getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).render('error', { message: 'Usuário não encontrado.' });
    }

    res.render('profile', { user });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Erro ao carregar o perfil do usuário.' });
  }
};

// Atualiza o perfil do usuário
exports.updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { username, password } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).render('error', { message: 'Usuário não encontrado.' });
    }

    user.username = username || user.username;

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
    }

    await user.save();
    res.render('profile', { user, message: 'Perfil atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Erro ao atualizar o perfil do usuário.' });
  }
};
