import React from "react";

export default function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        margin: "1rem",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>${product.price}</strong>
      <div style={{ marginTop: "1rem" }}>
        <button
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
