import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import logo from "../assets/logo.png";
import { createPaymentPreference } from "../services/api";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const cart = Array.isArray(location.state?.cart) ? location.state.cart : [];

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    cardType: "visa",
    cardNumber: "",
    cvv: "",
    expiry: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      return sum + Number(item?.price || 0) * Number(item?.qty || 0);
    }, 0);
  }, [cart]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { name, email, address, cardNumber, cvv, expiry } = form;
    if (!name || !email || !address || !cardNumber || !cvv || !expiry) {
      setError("Por favor completá todos los campos.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await createPaymentPreference(cart);
      if (res.data?.success) {
        navigate("/store", {
          state: { orderSuccess: true, orderId: res.data.orderId },
        });
      } else {
        setError("Hubo un error al procesar la compra. Intentá de nuevo.");
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "0.95rem",
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f5f7fb",
      padding: "clamp(1rem, 4vw, 2rem)",
      boxSizing: "border-box",
    },
    header: { textAlign: "center", marginBottom: "2rem" },
    logo: {
      width: "clamp(80px, 15vw, 120px)",
      marginBottom: "10px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    title: {
      margin: 0,
      fontSize: "clamp(1.4rem, 4vw, 2rem)",
      color: "#0f172a",
    },
    subtitle: {
      marginTop: "0.5rem",
      color: "#64748b",
      fontSize: "clamp(0.85rem, 2vw, 1rem)",
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
      gap: "1.5rem",
      maxWidth: "1100px",
      margin: "0 auto",
    },
    column: {
      background: "white",
      borderRadius: "12px",
      padding: "clamp(1rem, 4vw, 1.5rem)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
    },
    sectionTitle: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "1.5rem",
      paddingBottom: "0.5rem",
      borderBottom: "1px solid #e2e8f0",
    },
    productList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      maxHeight: "350px",
      overflowY: "auto",
      paddingRight: "0.5rem",
    },
    productRow: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "clamp(0.85rem, 2vw, 0.9rem)",
      color: "#334155",
      padding: "0.4rem 0",
      borderBottom: "1px solid #f1f5f9",
    },
    total: {
      marginTop: "1rem",
      fontWeight: "700",
      fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
      color: "#0f172a",
      display: "flex",
      justifyContent: "space-between",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      flex: 1,
    },
    errorMsg: { color: "#ef4444", fontSize: "0.85rem", marginTop: "0.3rem" },
    buttonRow: {
      display: "flex",
      gap: "10px",
      marginTop: "20px",
      flexWrap: "wrap",
    },
    btnPrimary: {
      flex: 1,
      minWidth: "120px",
      padding: "10px",
      backgroundColor: loading ? "#94a3b8" : "#32d5d5",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: loading ? "not-allowed" : "pointer",
      fontWeight: 700,
      fontSize: "0.95rem",
    },
    btnSecondary: {
      flex: 1,
      minWidth: "100px",
      padding: "10px",
      backgroundColor: "#e2e8f0",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: "0.95rem",
    },
  };

  if (cart.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.header}>
          <img src={logo} style={styles.logo} alt="logo" />
          <h1 style={styles.title}>Checkout</h1>
          <p style={styles.subtitle}>Verificá y pagá tus productos aquí.</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            No hay productos en el carrito.
          </p>
          <button
            onClick={() => navigate("/store")}
            style={{
              padding: "10px 24px",
              background: "#32d5d5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <img src={logo} style={styles.logo} alt="logo" />
        <h1 style={styles.title}>Checkout</h1>
        <p style={styles.subtitle}>Verificá y pagá tus productos aquí.</p>
      </div>

      <div style={styles.container}>
        <div style={styles.column}>
          <div style={styles.sectionTitle}>Resumen del pedido</div>
          <div style={styles.productList}>
            {cart.map((item, index) => (
              <div key={item._id || item.id || index} style={styles.productRow}>
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div style={styles.total}>
            <span>Total</span>
            <span style={{ color: "#32d5d5" }}>${total.toFixed(2)}</span>
          </div>
        </div>

        <div style={styles.column}>
          <div style={styles.sectionTitle}>Datos de pago</div>
          <div style={styles.formGroup}>
            <input
              name="name"
              placeholder="Nombre completo"
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="address"
              placeholder="Dirección de envío"
              onChange={handleChange}
              style={inputStyle}
            />
            <select
              name="cardType"
              value={form.cardType}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="visa">Visa</option>
              <option value="mastercard">MasterCard</option>
              <option value="amex">American Express</option>
            </select>
            <input
              name="cardNumber"
              placeholder="Número de tarjeta"
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="cvv"
              placeholder="CVV"
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="expiry"
              placeholder="Vencimiento MM/AA"
              onChange={handleChange}
              style={inputStyle}
            />
            {error && <div style={styles.errorMsg}>{error}</div>}
          </div>
          <div style={styles.buttonRow}>
            <button
              onClick={handleSubmit}
              style={styles.btnPrimary}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Confirmar compra"}
            </button>
            <button
              onClick={() => navigate("/store")}
              style={styles.btnSecondary}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
