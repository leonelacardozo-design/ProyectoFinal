import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/api";
import logo from "../assets/logo.png";

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "2rem",
  },

  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1rem",
  },

  logoImg: {
    width: "240px",
    height: "240px",
    objectFit: "cover",
    borderRadius: "14px",
    marginBottom: "0.5rem",
  },

  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#32d5d5",
    textAlign: "center",
  },

  subtitle: {
    color: "#64748b",
    marginTop: "0.3rem",
    textAlign: "center",
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2.5rem",
  },

  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },

  cardIcon: {
    fontSize: "2rem",
  },

  cardValue: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#f597a0",
  },

  cardLabel: {
    color: "#64748b",
    fontSize: "0.9rem",
  },

  actionBtn: {
    display: "inline-block",
    padding: "0.8rem 1.5rem",
    backgroundColor: "#32d5d5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    marginRight: "1rem",
    fontSize: "0.95rem",
    textDecoration: "none",
  },

  sectionTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#334155",
    marginBottom: "1rem",
  },

  categoryList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.8rem",
  },

  categoryTag: {
    backgroundColor: "#e0f2fe",
    color: "#f597a0",
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "500",
  },
};

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logoContainer}></div>

        <h1 style={styles.title}>
          <span>Inventario de la tienda</span>
        </h1>
        <hr />
      </div>

      <div style={styles.cardsGrid}>
        <div style={styles.card}>
          <span style={styles.cardIcon}>📦</span>
          <span style={styles.cardValue}>
            {loading ? "..." : totalProducts}
          </span>
          <span style={styles.cardLabel}>Productos registrados</span>
        </div>

        <div style={styles.card}>
          <span style={styles.cardIcon}>🏷️</span>
          <span style={styles.cardValue}>
            {loading ? "..." : categories.length}
          </span>
          <span style={styles.cardLabel}>Categorías activas</span>
        </div>

        <div style={styles.card}>
          <span style={styles.cardIcon}>📊</span>
          <span style={styles.cardValue}>{loading ? "..." : totalStock}</span>
          <span style={styles.cardLabel}>Unidades en stock</span>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2 style={styles.sectionTitle}>Acciones rápidas</h2>

        <button style={styles.actionBtn} onClick={() => navigate("/products")}>
          Ver todos los productos
        </button>

        <button
          style={styles.actionBtn}
          onClick={() => navigate("/products/new")}
        >
          + Agregar producto
        </button>
      </div>

      {categories.length > 0 && (
        <div>
          <h2 style={styles.sectionTitle}>Categorías en la tienda</h2>
          <div style={styles.categoryList}>
            {categories.map((cat) => (
              <span key={cat} style={styles.categoryTag}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
