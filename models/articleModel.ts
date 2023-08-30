import Sequelize from "sequelize";
import { DataTypes } from "sequelize";
import {sequelize} from '../configDb/database'

export default () => {
  sequelize.define("Article", {
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
    content: {
      type: DataTypes.STRING,
      required: true,
    },
  });
};
