import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  category: {
    type: DataTypes.ENUM(
      "Cepillos",
      "Pastas dentales",
      "Hilo dental",
      "Blanqueadores",
      "Enjuague bucal",
      "Otros",
    ),
    allowNull: false,
    defaultValue: "Otros",
  },
  imageUrl: {
    type: DataTypes.TEXT("long"),
  },
});
