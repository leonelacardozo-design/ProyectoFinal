import express from "express";
import {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/users", getUsers);

router.patch("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

export default router;
