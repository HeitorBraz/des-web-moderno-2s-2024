exports.dashboard = (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Acesso negado. Faça login.' });
    }
  
    res.json({ message: `Bem-vindo ao dashboard, ${req.session.username}!` });
  };
  