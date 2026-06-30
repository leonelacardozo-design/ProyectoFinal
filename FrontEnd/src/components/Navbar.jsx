import React from "react";
import { Link, useNavigate } from "react-router-dom";

const styles = {
  nav: {
    backgroundColor: "#0ea5e9",
    padding: "0.8rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  brand: {
    color: "white",
    fontWeight: "700",
    fontSize: "1.3rem",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  links: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "0.95rem",
  },
  logoutBtn: {
    backgroundColor: "white",
    color: "#0ea5e9",
    border: "none",
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/dashboard" style={styles.brand}>
        🦷 Smile Together
      </Link>
      {token && (
        <div style={styles.links}>
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>
          <Link to="/products" style={styles.link}>
            Productos
          </Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  );
}
