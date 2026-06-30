import "./Footer.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-logo-container">
          <img src={logo} alt="Smile Together" className="footer-logo" />
        </div>

        <div>
          <h3 className="footer-title">Navegación</h3>

          <p className="footer-info">
            <Link to="/" className="footer-link">
              Home
            </Link>
          </p>

          <p className="footer-info">
            <Link to="/store" className="footer-link">
              Tienda
            </Link>
          </p>

          <p className="footer-info">
            <Link to="/contacto" className="footer-link">
              Contacto
            </Link>
          </p>
        </div>

        <div>
          <h3 className="footer-title">Contacto</h3>

          <p className="footer-info">
            <a
              href="mailto:anima2026@proyectofinal.com"
              className="footer-link"
            >
              Correo: anima2026@proyectofinal.com
            </a>
          </p>

          <p className="footer-info">
            <a
              href="https://wa.me/5980000000"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              WhatsApp: +598 990000000
            </a>
          </p>
        </div>

        <div>
          <div>
            <h3 className="footer-title">Ubicación</h3>

            <p className="footer-info">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Mercedes+984+esq+Julio+Herrera+y+Obes+Montevideo"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                Mercedes 984 esq. Julio Herrera y Obes
              </a>
            </p>
          </div>
          <p className="footer-info">Edificio Ánima</p>
          <p className="footer-info">Piso Finest</p>
        </div>
      </div>

      <hr className="footer-divider" />

      <p className="footer-copy">
        © {new Date().getFullYear()} SmileTogether. Todos los derechos
        reservados.
      </p>
    </footer>
  );
}
