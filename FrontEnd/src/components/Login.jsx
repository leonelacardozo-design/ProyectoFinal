import React from "react";
import axios from "axios";
import LoginForm from "./LoginForm";

export default function Login() {
  const handleLogin = async ({ email, password }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        },
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      alert("Login exitoso");
    } catch (error) {
      alert(
        "Error en login: " + (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
