const Sequelize = require("sequelize");

const sequelize = new Sequelize("Articles", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
});
const models = sequelize.models

export default models;
