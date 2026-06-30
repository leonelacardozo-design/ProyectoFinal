import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, role, logout } = useAuth();

  const hideOn = ["/login", "/register"];
  if (hideOn.includes(location.pathname)) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />
        SmileTogether
      </Link>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>

        <Link to="/store" className="navbar-link">
          Tienda
        </Link>

        <Link to="/contacto" className="navbar-link">
          Contacto
        </Link>

        {token && role === "admin" && (
          <>
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>

            <Link to="/products" className="navbar-link">
              Productos
            </Link>
          </>
        )}

        {token ? (
          <button onClick={handleLogout} className="navbar-btn">
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link to="/login" className="navbar-outline">
              Iniciar sesión
            </Link>

            <Link to="/register" className="navbar-btn">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
