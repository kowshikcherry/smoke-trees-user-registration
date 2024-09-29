const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  "smoke_tree",
  "root",
  "1234",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = { sequelize, DataTypes };
