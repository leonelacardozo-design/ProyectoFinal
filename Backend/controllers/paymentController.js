export const createPreference = async (req, res) => {
  try {
    const { cart } = req.body;

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    console.log("🛒 Nueva orden recibida:");
    console.log(cart);

    res.json({
      success: true,
      message: "Compra registrada correctamente",
      total,
      orderId: Date.now(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al procesar la compra",
    });
  }
};
