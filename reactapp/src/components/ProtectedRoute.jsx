import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute: checks for token and optional role.
 * Expects localStorage keys: token, role
 */
export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (role && userRole !== role) return <Navigate to="/login" replace />;
  return children;
}
