import Sequelize from "sequelize";
import { DataTypes } from "sequelize";
import { sequelize } from '../database/database'

export default () => {
  sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      require: true,
    },
  });
};
