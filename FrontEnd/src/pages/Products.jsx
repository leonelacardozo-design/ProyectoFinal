import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../services/api";

const categoryColors = {
  Cepillos: "#dbeafe",
  "Pastas dentales": "#dcfce7",
  "Hilo dental": "#fef9c3",
  Blanqueadores: "#ede9fe",
  "Enjuague bucal": "#ffedd5",
  Otros: "#f1f5f9",
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#f597a0",
  },
  newBtn: {
    padding: "0.65rem 1.3rem",
    backgroundColor: "#32d5d5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  th: {
    backgroundColor: "#f8fafc",
    padding: "0.8rem 1rem",
    textAlign: "left",
    fontSize: "0.82rem",
    fontWeight: "600",
    color: "#64748b",
    borderBottom: "1px solid #e2e8f0",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  td: {
    padding: "0.9rem 1rem",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "0.9rem",
    color: "#334155",
    verticalAlign: "middle",
  },
  editBtn: {
    padding: "0.35rem 0.8rem",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.82rem",
    marginRight: "0.5rem",
  },
  deleteBtn: {
    padding: "0.35rem 0.8rem",
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.82rem",
  },
  categoryBadge: {
    display: "inline-block",
    padding: "0.25rem 0.7rem",
    borderRadius: "20px",
    fontSize: "0.78rem",
    fontWeight: "500",
  },
  empty: {
    textAlign: "center",
    padding: "3rem",
    color: "#94a3b8",
  },
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadProducts = () => {
    setLoading(true);
    fetchProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar "${name}"?`)) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch {
      alert("Error al eliminar el producto");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📦 Gestión de Productos</h1>
        <button style={styles.newBtn} onClick={() => navigate("/products/new")}>
          + Nuevo producto
        </button>
      </div>

      {loading ? (
        <p style={{ color: "#64748b" }}>Cargando productos...</p>
      ) : products.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ fontSize: "1.1rem" }}>
            No hay productos registrados aún.
          </p>
          <button
            style={{ ...styles.newBtn, marginTop: "1rem" }}
            onClick={() => navigate("/products/new")}
          >
            Agregar el primero
          </button>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Producto</th>
              <th style={styles.th}>Categoría</th>
              <th style={styles.th}>Precio</th>
              <th style={styles.th}>Stock</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={styles.td}>
                  <strong>{p.name}</strong>
                  {p.description && (
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "#94a3b8",
                        marginTop: "0.2rem",
                      }}
                    >
                      {p.description.length > 60
                        ? p.description.slice(0, 60) + "..."
                        : p.description}
                    </p>
                  )}
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.categoryBadge,
                      backgroundColor: categoryColors[p.category] || "#f1f5f9",
                    }}
                  >
                    {p.category || "Otros"}
                  </span>
                </td>
                <td style={styles.td}>${parseFloat(p.price).toFixed(2)}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      color: p.stock === 0 ? "#ef4444" : "#16a34a",
                      fontWeight: "600",
                    }}
                  >
                    {p.stock}
                  </span>
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.editBtn}
                    onClick={() => navigate(`/products/edit/${p.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(p.id, p.name)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
