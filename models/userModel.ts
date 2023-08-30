import Sequelize from "sequelize";
import { DataTypes } from "sequelize";
import { sequelize } from '../configDb/database'

export default () => {
  sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      required: [true, "password required"],
      minLength: [6, "Too Short Password"],
    },
    passwordChangedAt: DataTypes.DATE,
    passwordResetCode: DataTypes.STRING,
    passwordResetExpiration: DataTypes.DATE,
    passwordResetVerified: DataTypes.BOOLEAN,
    role: {
      type: DataTypes.STRING,
      enum: ["writer", "reader", "admin"],
      default: "reader",
    },
    addresses: {
      type: DataTypes.STRING,
    },
    image: { type: DataTypes.STRING },
  });
};
