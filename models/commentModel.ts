import Sequelize from "sequelize";
import { DataTypes } from "sequelize";

export default (sequelize) => {
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
