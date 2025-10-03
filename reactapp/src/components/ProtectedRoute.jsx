import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * - children: the component to render if authorized
 * - role: optional, the role required to access the route
 */
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is specified and user's role does not match, redirect to home/dashboard
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the component
  return children;
};

export default ProtectedRoute;
