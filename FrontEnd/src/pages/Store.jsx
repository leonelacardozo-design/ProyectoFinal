import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/api";
import logo from "../assets/logo.png";

const CATEGORIES = [
  "Todas",
  "Cepillos",
  "Pastas dentales",
  "Hilo dental",
  "Blanqueadores",
  "Enjuague bucal",
  "Otros",
];

const categoryColors = {
  Cepillos: "#dbeafe",
  "Pastas dentales": "#dcfce7",
  "Hilo dental": "#fef9c3",
  Blanqueadores: "#ede9fe",
  "Enjuague bucal": "#ffedd5",
  Otros: "#f1f5f9",
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f0f9ff",
  },
  hero: {
    background: "linear-gradient(135deg, #f597a0 0%, #32d5d5 100%)",
    color: "white",
    padding: "3rem 2rem",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
  },
  heroSub: {
    fontSize: "1.05rem",
    opacity: 0.9,
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "2rem",
  },
  filterRow: {
    display: "flex",
    gap: "0.6rem",
    flexWrap: "wrap",
    marginBottom: "2rem",
  },
  filterBtn: (active) => ({
    padding: "0.45rem 1.1rem",
    borderRadius: "20px",
    border: "1.5px solid",
    borderColor: active ? "#e2e8f0" : "#e2e8f0",
    backgroundColor: active ? "#32d5d5" : "white",
    color: active ? "white" : "#475569",
    fontWeight: "600",
    fontSize: "0.85rem",
    cursor: "pointer",
  }),
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "14px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  cardImg: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    backgroundColor: "#e0f2fe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3.5rem",
  },
  cardBody: {
    padding: "1.2rem",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  categoryBadge: (cat) => ({
    display: "inline-block",
    padding: "0.2rem 0.7rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "600",
    backgroundColor: categoryColors[cat] || "#f1f5f9",
    alignSelf: "flex-start",
  }),
  productName: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#1e293b",
  },
  productDesc: {
    fontSize: "0.85rem",
    color: "#64748b",
    flex: 1,
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.5rem",
  },
  price: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#32d5d5",
  },
  stock: (n) => ({
    fontSize: "0.78rem",
    color: n === 0 ? "#ef4444" : "#16a34a",
    fontWeight: "600",
  }),
  addBtn: (inCart, outOfStock) => ({
    width: "100%",
    marginTop: "0.8rem",
    padding: "0.65rem",
    backgroundColor: outOfStock ? "#e2e8f0" : inCart ? "#dcfce7" : "#32d5d5",
    color: outOfStock ? "#94a3b8" : inCart ? "#16a34a" : "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: outOfStock ? "not-allowed" : "pointer",
    fontSize: "0.9rem",
  }),
  cartBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#32d5d5",
    color: "white",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
    zIndex: 100,
  },
  cartText: {
    fontSize: "1rem",
    fontWeight: "600",
  },
  cartBtn: {
    padding: "0.6rem 1.5rem",
    backgroundColor: "white",
    color: "#32d5d5",
    border: "none",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  empty: {
    textAlign: "center",
    padding: "4rem",
    color: "#94a3b8",
    fontSize: "1.1rem",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
    padding: "1rem",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  },
  modalTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#32d5d5",
    marginBottom: "1rem",
  },
  modalItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.6rem 0",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "0.9rem",
  },
  modalTotal: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 0 0",
    fontWeight: "700",
    fontSize: "1.1rem",
    color: "#32d5d5",
  },
  modalBtnRow: {
    display: "flex",
    gap: "1rem",
    marginTop: "1.5rem",
  },
  modalCloseBtn: {
    flex: 1,
    padding: "0.7rem",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  modalCheckoutBtn: {
    flex: 1,
    padding: "0.7rem",
    backgroundColor: "#32d5d5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

const categoryIcon = {
  Cepillos: "🪥",
  "Pastas dentales": "🧴",
  "Hilo dental": "🧵",
  Blanqueadores: "✨",
  "Enjuague bucal": "💧",
  Otros: "📦",
};

export default function Store() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (cat) => {
    setActiveCategory(cat);
    if (cat === "Todas") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === cat));
    }
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const isInCart = (id) => cart.some((i) => i.id === id);

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "120px", marginBottom: "0.5rem" }}
        />
        <h1 style={styles.heroTitle}>Smile Together</h1>
        <p style={styles.heroSub}>La salud bucal a través de la sonrisa</p>
      </div>
      <hr />

      <hr />
      <div style={styles.container}>
        <div style={styles.filterRow}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              style={styles.filterBtn(activeCategory === cat)}
              onClick={() => handleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: "#64748b" }}>Cargando productos...</p>
        ) : filtered.length === 0 ? (
          <div style={styles.empty}>No hay productos en esta categoría.</div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((p) => {
              const outOfStock = p.stock === 0;
              const inCart = isInCart(p.id);
              return (
                <div key={p.id} style={styles.card}>
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      style={{ ...styles.cardImg, display: "block" }}
                    />
                  ) : (
                    <div style={styles.cardImg}>
                      {categoryIcon[p.category] || "📦"}
                    </div>
                  )}

                  <div style={styles.cardBody}>
                    <span style={styles.categoryBadge(p.category)}>
                      {p.category || "Otros"}
                    </span>
                    <p style={styles.productName}>{p.name}</p>
                    {p.description && (
                      <p style={styles.productDesc}>{p.description}</p>
                    )}
                    <div style={styles.priceRow}>
                      <span style={styles.price}>
                        ${parseFloat(p.price).toFixed(2)}
                      </span>
                      <span style={styles.stock(p.stock)}>
                        {outOfStock ? "Sin stock" : `Stock: ${p.stock}`}
                      </span>
                    </div>

                    <button
                      style={styles.addBtn(inCart, outOfStock)}
                      disabled={outOfStock}
                      onClick={() => handleAddToCart(p)}
                    >
                      {outOfStock
                        ? "Sin stock"
                        : inCart
                          ? "✓ Agregado al carrito"
                          : !isLoggedIn
                            ? "Iniciá sesión para comprar"
                            : "Agregar al carrito"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {cartCount > 0 && (
        <div style={styles.cartBar}>
          <span style={styles.cartText}>
            🛒 {cartCount} {cartCount === 1 ? "producto" : "productos"} — $
            {cartTotal.toFixed(2)}
          </span>
          <button style={styles.cartBtn} onClick={() => setShowCart(true)}>
            Ver carrito
          </button>
        </div>
      )}

      {showCart && (
        <div style={styles.modalOverlay} onClick={() => setShowCart(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>🛒 Tu carrito</h2>

            {cart.map((item) => (
              <div key={item.id} style={styles.modalItem}>
                <span>
                  {item.name}{" "}
                  <span style={{ color: "#94a3b8" }}>x{item.qty}</span>
                </span>
                <div
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <span style={{ fontWeight: "600" }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                  <span
                    style={{
                      color: "#ef4444",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                    }}
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Quitar
                  </span>
                </div>
              </div>
            ))}

            <div style={styles.modalTotal}>
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div style={styles.modalBtnRow}>
              <button
                style={styles.modalCloseBtn}
                onClick={() => setShowCart(false)}
              >
                Seguir comprando
              </button>
              <button
                style={styles.modalCheckoutBtn}
                onClick={() => alert("Función de compra próximamente 🦷")}
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
