const { Sequelize } = require('sequelize');

// Configura a conexão com o banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database/database.sqlite'
});

module.exports = sequelize;
