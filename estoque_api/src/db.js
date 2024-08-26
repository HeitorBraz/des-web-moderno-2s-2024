const Sequelize = require('sequelize');

// Cria uma nova instância do Sequelize e configura a conexão com o SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'  // Especifica o caminho do arquivo de banco de dados
});

module.exports = sequelize;
