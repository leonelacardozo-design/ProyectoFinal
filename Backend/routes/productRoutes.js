import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// READ: listar productos
router.get("/", verifyToken, getProducts);

// CREATE: crear producto
router.post("/", verifyToken, createProduct);

// UPDATE: modificar producto
router.patch("/:id", verifyToken, updateProduct);

// DELETE: eliminar producto
router.delete("/:id", verifyToken, deleteProduct);

export default router;
