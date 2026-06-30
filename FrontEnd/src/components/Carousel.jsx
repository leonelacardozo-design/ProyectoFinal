import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const slides = [
  {
    image:
      "https://media.istockphoto.com/id/840618652/es/foto/sonrisa-joven-dientes-blancos-en-el-plan-maestro.jpg?s=170667a&w=0&k=20&c=ZOFEl1iRv7sBLw7b0rHty_OOZLq9Diz1XberYSkn_fs=",
    logo: logo,
    title: "La salud es un derecho",
    subtitle: "Para una vida digna la salud es primordial",
  },
  {
    image:
      "https://t4.ftcdn.net/jpg/07/86/31/77/360_F_786317763_ShCKtrWPtctmaubmDOYJZtLtQ2HBETEo.jpg",
    logo: logo,
    title: "Pasantías y becas en programa de impacto social",
    subtitle: "Oportunidades a profesionales y futuros odontólogos",
  },
  {
    image:
      "https://media.istockphoto.com/id/1454616020/vector/many-colored-human-hands-with-heart-shape-illustration.jpg?s=170667a&w=0&k=20&c=cVlReQACNloPSFum3GZM0bxhP-IA-BRUzbawmCDoWXc=",
    logo: logo,
    title: "Atención gratuita y personalizada",
    subtitle: "Jornadas barriales",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        ...styles.container,
        backgroundImage: `url(${slides[current].image})`,
      }}
    >
      <div style={styles.overlay}>
        <img src={slides[current].logo} alt="logo" style={styles.logo} />
        <h1 style={styles.title}>{slides[current].title}</h1>
        <p style={styles.subtitle}>{slides[current].subtitle}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "clamp(260px, 50vw, 500px)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  logo: {
    width: "clamp(140px, 30vw, 400px)",
    marginBottom: "0.2rem",
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
};
