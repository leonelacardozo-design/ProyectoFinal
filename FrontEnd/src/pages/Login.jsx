import React, { useState } from "react";
import { loginUser } from "../services/api";
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)",
    padding: "1rem",
  },

  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "clamp(1.2rem, 4vw, 2.5rem)",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 8px 32px rgba(14,165,233,0.15)",
    textAlign: "center",
  },

  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.5rem",
    width: "100%",
  },

  logoImg: {
    width: "clamp(120px, 35vw, 200px)",
    height: "clamp(120px, 35vw, 200px)",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "0.5rem",
    display: "block",
  },

  title: {
    fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
    fontWeight: "700",
    color: "#f597a0",
    margin: "0.5rem 0 0.3rem",
    textAlign: "center",
    width: "100%",
  },

  subtitle: {
    color: "#64748b",
    fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
    marginBottom: "1.5rem",
    textAlign: "center",
    width: "100%",
  },

  label: {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "0.3rem",
    textAlign: "left",
  },

  input: {
    width: "100%",
    padding: "0.65rem 0.9rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.95rem",
    marginBottom: "1rem",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#32d5d5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "0.5rem",
  },

  error: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    fontSize: "0.85rem",
    marginBottom: "1rem",
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      const token = res.data.token;
      const role = res.data.user.role;

      login(token, role);

      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/store");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error al iniciar sesión. Verificá tus datos.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <img src={logo} alt="Logo" style={styles.logoImg} />
          <h1 style={styles.title}>SmileTogether</h1>
          <p style={styles.subtitle}>Logueate para acceder a la tienda</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Correo electrónico</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Contraseña</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "1.2rem",
            fontSize: "0.88rem",
            color: "#64748b",
          }}
        >
          ¿No tenés cuenta?{" "}
          <Link to="/register" style={{ color: "#f597a0", fontWeight: "600" }}>
            Registrate
          </Link>
        </div>
      </div>
    </div>
  );
}
