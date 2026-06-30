import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/products">Productos</Link>
      <button onClick={handleLogout}>Salir</button>
    </nav>
  );
}
