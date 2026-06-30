import { Product } from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;
    if (!name || price === undefined)
      return res
        .status(400)
        .json({ message: "Nombre y precio son requeridos" });

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
    });
    res.status(201).json({ message: "Producto creado", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.update(req.body, { where: { id } });

    if (updated[0] === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    const product = await Product.findByPk(id);
    res.json({ message: "Producto actualizado correctamente", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id } });

    if (deleted === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
