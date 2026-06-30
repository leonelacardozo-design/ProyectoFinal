import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME, // nombre de la base
  process.env.DB_USER, // usuario de MySQL
  process.env.DB_PASS, // contraseña
  {
    host: process.env.DB_HOST, // host (ej: localhost)
    dialect: "mysql",
  },
);
