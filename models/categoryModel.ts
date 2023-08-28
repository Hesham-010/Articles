import Sequelize from "sequelize";
import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      required: true,
    },
  });
};
