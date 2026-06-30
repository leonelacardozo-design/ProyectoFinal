import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js"; // acá se importa lo que definiste en models/index.js
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Conexión DB y servidor
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor corriendo en puerto 3000");
  });
});
