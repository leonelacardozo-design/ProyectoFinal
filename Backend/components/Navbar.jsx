import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/products">Productos</Link>
      <Link to="/login">Salir</Link>
    </nav>
  );
}
