import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    condicion: "",
    email: "",
    celular: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Solicitud enviada correctamente. Nos pondremos en contacto a la brevedad.",
    );

    setFormData({
      nombre: "",
      edad: "",
      condicion: "",
      email: "",
      celular: "",
      mensaje: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-card">
          <h1 className="contact-title">Atención personalizada</h1>

          <p className="contact-subtitle">
            Si desea solicitar nuestros servicios o realizar una consulta
            particular, complete el siguiente formulario.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-group">
              <label>Nombre completo</label>
              <input
                className="contact-input"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-group">
              <label>Edad</label>
              <input
                className="contact-input"
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-group">
              <label>Condición</label>
              <select
                className="contact-select"
                name="condicion"
                value={formData.condicion}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una opción</option>
                <option>Jubilado o pensionista</option>
                <option>Estudiante universitario</option>
                <option>Estudiante de educación media</option>
                <option>Niño en edad escolar</option>
                <option>Persona con discapacidad</option>
                <option>Otro</option>
              </select>
            </div>

            <div className="contact-group">
              <label>Correo electrónico</label>
              <input
                className="contact-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-group">
              <label>Celular</label>
              <input
                className="contact-input"
                type="text"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-group">
              <label>Mensaje</label>
              <textarea
                className="contact-textarea"
                name="mensaje"
                rows="6"
                value={formData.mensaje}
                onChange={handleChange}
                required
                placeholder="Describa su situación o consulta..."
              />
            </div>

            <button className="contact-button" type="submit">
              Enviar solicitud
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
