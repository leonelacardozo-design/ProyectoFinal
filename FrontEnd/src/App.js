import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import Store from "./pages/Store";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      {" "}
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tienda" element={<Store />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />

        <Route
          path="/products/new"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/products/edit/:id"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />

        <Route path="/" element={<Navigate to="/tienda" replace />} />
        <Route path="*" element={<Navigate to="/tienda" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
