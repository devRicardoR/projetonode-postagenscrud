require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const Sequelize = require("sequelize");

// Conexão com o banco de dados usando as variáveis de ambiente
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};