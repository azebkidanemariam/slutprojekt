const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "Database/ingeBraBygg.db",
});

module.exports = db;
