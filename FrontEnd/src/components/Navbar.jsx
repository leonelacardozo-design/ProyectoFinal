import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const styles = {
  nav: {
    backgroundColor: "#32d5d5",
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
    gap: "0.6rem",
  },
  logo: {
    height: "34px",
    width: "34px",
    borderRadius: "6px",
    objectFit: "cover",
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
    color: "#32d5d5",
    border: "none",
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  outlineBtn: {
    backgroundColor: "transparent",
    color: "white",
    border: "1.5px solid white",
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem",
    textDecoration: "none",
  },
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const hideOn = ["/login", "/register"];
  if (hideOn.includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/tienda");
  };

  const isAdmin =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/products");

  if (isAdmin) {
    return (
      <nav style={styles.nav}>
        <Link to="/dashboard" style={styles.brand}>
          <img src={logo} alt="Logo" style={styles.logo} />
          Smile Together
        </Link>
        <div style={styles.links}>
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>
          <Link to="/products" style={styles.link}>
            Productos
          </Link>
          <Link to="/tienda" style={styles.link}>
            Ver tienda
          </Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Cerrar sesión
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav style={styles.nav}>
      <Link to="/tienda" style={styles.brand}>
        <img src={logo} alt="Logo" style={styles.logo} />
        Smile Together
      </Link>
      <div style={styles.links}>
        <Link to="/tienda" style={styles.link}>
          Tienda
        </Link>
        {token ? (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link to="/login" style={styles.outlineBtn}>
              Iniciar sesión
            </Link>
            <Link to="/register" style={styles.logoutBtn}>
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
