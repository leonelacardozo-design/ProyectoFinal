import express from "express";
import {
  getProducts,
  createProduct,
} from "../controllers/productController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getProducts);
router.post("/", verifyToken, createProduct);

export default router;
