const Sequelize = require("sequelize");

export const sequelize = new Sequelize("Articles", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
});
export const models = sequelize.models

