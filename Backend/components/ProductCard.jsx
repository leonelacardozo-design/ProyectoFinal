import React from "react";

export default function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>${product.price}</strong>
    </div>
  );
}
