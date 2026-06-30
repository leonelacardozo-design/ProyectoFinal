import React, { useState } from "react";
import { loginUser } from "../services/api";
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 8px 32px rgba(14,165,233,0.15)",
  },
  logo: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  logoImg: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#f597a0",
    margin: "0.5rem 0 0.3rem",
  },
  subtitle: {
    color: "#64748b",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "0.3rem",
  },
  input: {
    width: "100%",
    padding: "0.65rem 0.9rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.95rem",
    marginBottom: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
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
          <h1 style={styles.title}>Smile Together</h1>
          <p style={styles.subtitle}>
            Accede a nuestros productos ingresando aquí
          </p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Correo electrónico</label>
          <input
            type="email"
            placeholder="admin@smiletogether.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
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
          <Link
            to="/register"
            style={{
              color: "#0ea5e9",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Registrate
          </Link>
        </div>
      </div>
    </div>
  );
}
