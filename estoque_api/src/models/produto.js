const Sequelize = require('sequelize');
const db = require('../db');  // Certifique-se de ajustar o caminho conforme necessário

const Produto = db.define('Produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,  // O campo será autoincrementado
        primaryKey: true,     // O campo será a chave primária
        allowNull: false      // O campo não pode ser nulo
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false      // O campo não pode ser nulo
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false      // O campo não pode ser nulo
    }
});

module.exports = Produto;