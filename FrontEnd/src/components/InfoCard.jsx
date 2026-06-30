import React, { useEffect, useState } from "react";

export default function InfoCard({ title, text, images = [], link }) {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div style={styles.card}>
      {images.length > 0 && (
        <div style={styles.imageContainer}>
          <img
            src={images[index]}
            alt={typeof title === "string" ? title : "info"}
            style={styles.image}
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      )}

      <div style={styles.content}>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            style={{
              ...styles.title,
              color: hover ? "#32d5d5" : "#f597a0",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {title}
          </a>
        ) : (
          <h3 style={styles.title}>{title}</h3>
        )}

        <p style={styles.text}>{text}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,.08)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  imageContainer: {
    width: "100%",
    height: "220px",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  content: {
    padding: "1.5rem",
    flex: 1,
  },

  title: {
    color: "#32d5d5",
    marginBottom: "1rem",
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: 700,
    transition: "color 0.3s ease",
    cursor: "pointer",
    textDecoration: "none",
  },

  text: {
    color: "#64748b",
    lineHeight: "1.7",
    textAlign: "center",
  },
};
