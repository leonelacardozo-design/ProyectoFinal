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
  page: { minHeight: "100vh", backgroundColor: "#f0f9ff" },
  carousel: {
    width: "100%",
    height: "clamp(260px, 50vw, 500px)",
    position: "relative",
    overflow: "hidden",
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.35)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    padding: "1rem",
    boxSizing: "border-box",
  },
  textBlock: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "clamp(1.1rem, 3.5vw, 2.2rem)",
    fontWeight: "600",
    marginBottom: "0.3rem",
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: "clamp(0.85rem, 2.5vw, 1.5rem)",
    maxWidth: "650px",
    opacity: 0.95,
    padding: "0 1rem",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "clamp(1rem, 3vw, 2rem)",
    width: "100%",
    boxSizing: "border-box",
  },
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
    marginBottom: "1.5rem",
  },
  filterBtn: (active) => ({
    padding: "0.45rem 1.1rem",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    backgroundColor: active ? "#32d5d5" : "white",
    color: active ? "white" : "#475569",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
  }),
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
    gap: "1.2rem",
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
    height: "clamp(140px, 20vw, 180px)",
    objectFit: "cover",
  },
  cardBody: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    flex: 1,
  },
  badge: (cat) => ({
    alignSelf: "flex-start",
    padding: "0.2rem 0.7rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 600,
    backgroundColor: categoryColors[cat] || "#f1f5f9",
  }),
  name: { fontSize: "clamp(0.9rem, 2.5vw, 1rem)", fontWeight: 700 },
  desc: { fontSize: "0.85rem", color: "#64748b", flex: 1 },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: "clamp(1rem, 3vw, 1.2rem)",
    fontWeight: 700,
    color: "#32d5d5",
  },
  stock: (n) => ({
    fontSize: "0.8rem",
    fontWeight: 600,
    color: n === 0 ? "#ef4444" : "#16a34a",
  }),
  addBtn: (out, inCart) => ({
    width: "100%",
    padding: "0.7rem",
    marginTop: "0.8rem",
    borderRadius: "10px",
    border: "none",
    fontWeight: 700,
    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
    cursor: out ? "not-allowed" : "pointer",
    backgroundColor: inCart ? "#dcfce7" : out ? "#e2e8f0" : "#32d5d5",
    color: inCart ? "#16a34a" : out ? "#94a3b8" : "white",
  }),
  cartBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 999,
    padding: "0.6rem 1.1rem",
    background: "white",
    borderRadius: "30px",
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
  },
  addedModal: {
    position: "fixed",
    bottom: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "white",
    borderRadius: "14px",
    padding: "0.9rem 1.2rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    zIndex: 2000,
    width: "clamp(280px, 90vw, 400px)",
    boxSizing: "border-box",
  },
  addedLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: 600,
    color: "#16a34a",
    fontSize: "0.9rem",
  },
  viewCartBtn: {
    padding: "0.5rem 0.9rem",
    background: "#32d5d5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontSize: "0.85rem",
    flexShrink: 0,
  },
  cartOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    zIndex: 3000,
    boxSizing: "border-box",
  },
  cartPanel: {
    width: "100%",
    maxWidth: "520px",
    background: "white",
    borderRadius: "16px",
    padding: "clamp(1rem, 4vw, 1.5rem)",
    maxHeight: "85vh",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  cartPanelTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: "1.2rem",
    color: "#0f172a",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    padding: "0.8rem 0",
    borderBottom: "1px solid #f1f5f9",
  },
  cartItemImg: {
    width: "52px",
    height: "52px",
    borderRadius: "8px",
    objectFit: "cover",
    flexShrink: 0,
  },
  cartItemInfo: { flex: 1, minWidth: 0 },
  cartItemName: {
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "#0f172a",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cartItemPrice: { fontSize: "0.85rem", color: "#64748b" },
  qtyControls: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    flexShrink: 0,
  },
  qtyBtn: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "1.5px solid #e2e8f0",
    background: "white",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyNum: { fontWeight: 700, minWidth: "20px", textAlign: "center" },
  cartTotal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 0 0.5rem",
    fontWeight: 700,
    fontSize: "1.1rem",
  },
  cartActions: { display: "flex", gap: "10px", marginTop: "1rem" },
  btnSecondary: {
    flex: 1,
    padding: "0.75rem",
    background: "#f1f5f9",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    cursor: "pointer",
    color: "#475569",
    fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
  },
  btnPrimary: {
    flex: 1,
    padding: "0.75rem",
    background: "#32d5d5",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    cursor: "pointer",
    color: "white",
    fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    zIndex: 3000,
  },
  modal: {
    width: "100%",
    maxWidth: "420px",
    background: "white",
    borderRadius: "14px",
    padding: "1.2rem",
  },
  modalActions: {
    display: "flex",
    gap: "10px",
    marginTop: "1rem",
    flexWrap: "wrap",
  },
  btnLogin: {
    flex: 1,
    padding: "10px",
    background: "#32d5d5",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 700,
  },
  btnCancel: {
    flex: 1,
    padding: "10px",
    background: "#e2e8f0",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 700,
  },
};

export default function Store() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [cart, setCart] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [showAddedModal, setShowAddedModal] = useState(false);
  const [showCartPanel, setShowCartPanel] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();

  const slides = [
    {
      image:
        "https://gacetamedica.com/wp-content/uploads/2023/06/GettyImages-1409041204.jpg",
      title: "Tu salud importa",
      subtitle: "Jornadas de atención gratuita",
    },
    {
      image:
        "https://cdn.firespring.com/images/80f7ee1f-f74d-4840-ad81-4eb596834a04.jpg",
      title: "Tu sonrisa es digna",
      subtitle: "Atención personalizada",
    },
    {
      image:
        "https://sdk-dentalcollege.edu.in/sdk-cms/images/bannerimages/1524651961_large.jpg",
      title: "Tu derecho es nuestra accesibilidad",
      subtitle: "Jornadas barriales gratuitas",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((p) => (p + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchProducts().then((res) => {
      const data = res.data || [];
      setProducts(data);
      setFiltered(data);
    });
  }, []);

  const handleFilter = (cat) => {
    setActiveCategory(cat);
    setFiltered(
      cat === "Todas" ? products : products.filter((p) => p.category === cat),
    );
  };

  const handleAddToCart = (p) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    const productId = p._id || p.id;
    setCart((prev) => {
      const exists = prev.find((i) => i._id === productId);
      if (exists)
        return prev.map((i) =>
          i._id === productId ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...p, _id: productId, qty: 1 }];
    });
    setCartIds((prev) => [...new Set([...prev, productId])]);
    setShowAddedModal(true);
    setTimeout(() => setShowAddedModal(false), 3000);
  };

  const handleIncrement = (id) => {
    setCart((prev) =>
      prev.map((i) => (i._id === id ? { ...i, qty: i.qty + 1 } : i)),
    );
  };

  const handleDecrement = (id) => {
    setCart((prev) => {
      const item = prev.find((i) => i._id === id);
      if (item.qty === 1) {
        setCartIds((ids) => ids.filter((cid) => cid !== id));
        return prev.filter((i) => i._id !== id);
      }
      return prev.map((i) => (i._id === id ? { ...i, qty: i.qty - 1 } : i));
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div style={styles.page}>
      <div style={styles.carousel}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${slides[currentImage].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {cartCount > 0 && (
            <button
              style={styles.cartBtn}
              onClick={() => setShowCartPanel(true)}
            >
              🛒 {cartCount} | ${cartTotal.toFixed(2)}
            </button>
          )}
          <div style={styles.overlay}>
            <img
              src={logo}
              style={{ width: "clamp(140px, 30vw, 400px)" }}
              alt="logo"
            />
            <div style={styles.textBlock}>
              <h1 style={styles.title}>{slides[currentImage].title}</h1>
              <p style={styles.subtitle}>{slides[currentImage].subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.filterRow}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              style={styles.filterBtn(activeCategory === c)}
              onClick={() => handleFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {filtered.map((p) => {
            const out = p.stock === 0;
            const id = p._id || p.id;
            const inCart = cartIds.includes(id);
            return (
              <div key={id} style={styles.card}>
                <img src={p.imageUrl} style={styles.cardImg} alt={p.name} />
                <div style={styles.cardBody}>
                  <span style={styles.badge(p.category)}>{p.category}</span>
                  <div style={styles.name}>{p.name}</div>
                  <div style={styles.desc}>{p.description}</div>
                  <div style={styles.priceRow}>
                    <div style={styles.price}>${p.price}</div>
                    <div style={styles.stock(p.stock)}>
                      {out ? "Sin stock" : `${p.stock} disponibles`}
                    </div>
                  </div>
                  <button
                    style={styles.addBtn(out, inCart)}
                    disabled={out}
                    onClick={() => handleAddToCart(p)}
                  >
                    {inCart ? "Agregaste este producto" : "Agregar al carrito"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAddedModal && (
        <div style={styles.addedModal}>
          <div style={styles.addedLabel}>
            <span>Producto agregado</span>
          </div>
          <button
            style={styles.viewCartBtn}
            onClick={() => {
              setShowAddedModal(false);
              setShowCartPanel(true);
            }}
          >
            Ver productos agregados
          </button>
        </div>
      )}

      {showCartPanel && (
        <div style={styles.cartOverlay} onClick={() => setShowCartPanel(false)}>
          <div style={styles.cartPanel} onClick={(e) => e.stopPropagation()}>
            <div style={styles.cartPanelTitle}>Mi carrito</div>
            {cart.length === 0 ? (
              <p
                style={{
                  color: "#64748b",
                  textAlign: "center",
                  padding: "2rem 0",
                }}
              >
                No hay productos en el carrito.
              </p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item._id} style={styles.cartItem}>
                    <img
                      src={item.imageUrl}
                      style={styles.cartItemImg}
                      alt={item.name}
                    />
                    <div style={styles.cartItemInfo}>
                      <div style={styles.cartItemName}>{item.name}</div>
                      <div style={styles.cartItemPrice}>
                        ${(item.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                    <div style={styles.qtyControls}>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => handleDecrement(item._id)}
                      >
                        −
                      </button>
                      <span style={styles.qtyNum}>{item.qty}</span>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => handleIncrement(item._id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div style={styles.cartTotal}>
                  <span>Total</span>
                  <span style={{ color: "#32d5d5" }}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div style={styles.cartActions}>
                  <button
                    style={styles.btnSecondary}
                    onClick={() => setShowCartPanel(false)}
                  >
                    Seguir comprando
                  </button>
                  <button
                    style={styles.btnPrimary}
                    onClick={() => {
                      setShowCartPanel(false);
                      navigate("/checkout", {
                        state: { cart, total: cartTotal },
                      });
                    }}
                  >
                    Pagar ahora
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showLoginModal && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowLoginModal(false)}
        >
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Iniciar sesión requerido</h3>
            <p style={{ color: "#64748b" }}>
              Debes iniciar sesión para agregar productos al carrito.
            </p>
            <div style={styles.modalActions}>
              <button
                style={styles.btnLogin}
                onClick={() => navigate("/login")}
              >
                Ir a login
              </button>
              <button
                style={styles.btnCancel}
                onClick={() => setShowLoginModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
