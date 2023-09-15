import Sequelize from "sequelize";
import { DataTypes } from "sequelize";
import { sequelize } from '../database/database'

export default () => {
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
