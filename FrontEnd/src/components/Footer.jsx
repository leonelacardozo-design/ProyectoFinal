export default function Footer() {
  const styles = {
    footer: {
      backgroundColor: "#32d5d5",
      color: "white",
      padding: "2rem",
      textAlign: "center",
      marginTop: "auto",
    },
    logo: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    info: {
      fontSize: "0.9rem",
      marginBottom: "0.3rem",
    },
    link: {
      color: "white",
      textDecoration: "none",
    },
    copy: {
      fontSize: "0.8rem",
      marginTop: "1rem",
      opacity: 0.8,
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.logo}>Smile Together</div>
      <p style={styles.info}>Av. Ánima 2026, esquina Finest.</p>
      <p style={styles.info}>
        <a href="mailto:anima2026@proyectofinal.com" style={styles.link}>
          anima2026@proyectofinal.com
        </a>
      </p>
      <p style={styles.info}>
        <a
          href="https://wa.me/5980000000"
          target="_blank"
          rel="noreferrer"
          style={styles.link}
        >
          WhatsApp: +598 990000000
        </a>
      </p>
      <p style={styles.copy}>
        © {new Date().getFullYear()} Smile Together. Todos los derechos
        reservados.
      </p>
    </footer>
  );
}
