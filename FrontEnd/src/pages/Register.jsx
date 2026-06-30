import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

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
  logoIcon: { fontSize: "3rem" },
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
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#f597a0",
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
  success: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    fontSize: "0.85rem",
    marginBottom: "1rem",
  },
  linkRow: {
    textAlign: "center",
    marginTop: "1.2rem",
    fontSize: "0.88rem",
    color: "#64748b",
  },
  link: {
    color: "#f597a0",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await registerUser({ email, password });
      setSuccess("¡Cuenta creada! Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error al registrarse. Intentá de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🦷</div>
          <h1 style={styles.title}>Smile Together</h1>
          <p style={styles.subtitle}>Crear cuenta de cliente</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Correo electrónico</label>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Contraseña</label>
          <input
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Confirmar contraseña</label>
          <input
            type="password"
            placeholder="Repetí tu contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <div style={styles.linkRow}>
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" style={styles.link}>
            Iniciá sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
