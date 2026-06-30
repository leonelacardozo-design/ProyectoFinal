import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  updateProduct,
  fetchProductById,
} from "../services/api";

const CATEGORIES = [
  "Cepillos",
  "Pastas dentales",
  "Hilo dental",
  "Blanqueadores",
  "Enjuague bucal",
  "Otros",
];

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#f597a0",
    marginBottom: "1.5rem",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  formGroup: {
    marginBottom: "1.2rem",
  },
  label: {
    display: "block",
    fontWeight: "600",
    fontSize: "0.85rem",
    color: "#475569",
    marginBottom: "0.4rem",
  },
  input: {
    width: "100%",
    padding: "0.6rem 0.9rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
  },
  fileInput: {
    width: "100%",
    padding: "0.6rem 0.9rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.9rem",
    backgroundColor: "white",
  },
  select: {
    width: "100%",
    padding: "0.6rem 0.9rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
    backgroundColor: "white",
  },
  textarea: {
    width: "100%",
    padding: "0.6rem 0.9rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
    minHeight: "80px",
    resize: "vertical",
  },
  btnRow: {
    display: "flex",
    gap: "1rem",
    marginTop: "1.5rem",
  },
  submitBtn: {
    flex: 1,
    padding: "0.75rem",
    backgroundColor: "#32d5d5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  cancelBtn: {
    flex: 1,
    padding: "0.75rem",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1.5px solid #e2e8f0",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  error: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    fontSize: "0.85rem",
    marginBottom: "1rem",
  },
};

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Otros",
    imageUrl: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchProductById(id)
        .then((res) => {
          const p = res.data;
          setForm({
            name: p.name || "",
            description: p.description || "",
            price: p.price || "",
            stock: p.stock || "",
            category: p.category || "Otros",
            imageUrl: p.imageUrl || "",
          });
        })
        .catch(() => setError("No se pudo cargar el producto"));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        imageUrl: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
      };

      if (isEditing) {
        await updateProduct(id, data);
      } else {
        await createProduct(data);
      }

      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {isEditing ? "✏️ Editar producto" : "➕ Nuevo producto"}
      </h1>

      <div style={styles.card}>
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre del producto *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Precio *</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Stock *</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Categoría</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={styles.select}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Imagen del producto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={styles.fileInput}
            />
          </div>

          <div style={styles.btnRow}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={() => navigate("/products")}
            >
              Cancelar
            </button>

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? "Guardando..." : isEditing ? "Guardar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
