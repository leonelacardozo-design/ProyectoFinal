import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import Store from "./pages/Store";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacto" element={<Contact />} />

          <Route path="/store" element={<Store />} />

          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute roleRequired="admin">
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/products"
            element={
              <PrivateRoute roleRequired="admin">
                <Products />
              </PrivateRoute>
            }
          />

          <Route
            path="/products/new"
            element={
              <PrivateRoute roleRequired="admin">
                <ProductForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/products/edit/:id"
            element={
              <PrivateRoute roleRequired="admin">
                <ProductForm />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
