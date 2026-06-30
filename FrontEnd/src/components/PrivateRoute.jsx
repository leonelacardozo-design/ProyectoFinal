import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired) {
    if (!role || role !== roleRequired) {
      return <Navigate to="/store" replace />;
    }
  }

  return children;
}
