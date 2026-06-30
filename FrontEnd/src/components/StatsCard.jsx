import React, { useState } from "react";

export default function StatsCard({ number, text, link }) {
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.card}>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          style={{ ...styles.link, color: hover ? "#32d5d5" : "#f597a0" }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {number}
        </a>
      ) : (
        <div style={styles.number}>{number}</div>
      )}
      <div style={styles.text}>{text}</div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    width: "clamp(200px, 40vw, 250px)",
    padding: "1.5rem",
    borderRadius: "16px",
    boxShadow: "0 2px 12px rgba(0,0,0,.08)",
    textAlign: "center",
  },
  number: {
    color: "#f597a0",
    fontSize: "clamp(1.2rem, 3vw, 2rem)",
    fontWeight: "700",
    marginBottom: "1rem",
  },
  link: {
    fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
    fontWeight: "700",
    marginBottom: "1rem",
    textDecoration: "none",
    display: "block",
    transition: "color 0.3s ease",
  },
  text: {
    color: "#64748b",
    lineHeight: "1.6",
    fontSize: "clamp(0.85rem, 2vw, 1rem)",
  },
};
