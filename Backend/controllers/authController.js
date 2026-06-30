import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email y contraseña requeridos" });

    const exists = await User.findOne({ where: { email } });

    if (exists)
      return res.status(409).json({ message: "El email ya está registrado" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
    });

    res.status(201).json({
      message: "Usuario registrado",
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "createdAt"],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const dataToUpdate = {};

    if (email) dataToUpdate.email = email;

    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.update(dataToUpdate, {
      where: { id },
    });

    if (updated[0] === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.destroy({
      where: { id },
    });

    if (deleted === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
