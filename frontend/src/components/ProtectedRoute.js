// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, roleRequired }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (role !== roleRequired) {
    // Redirect to the appropriate dashboard if the role does not match
    return <Navigate to={`/${role}-dashboard`} replace />;
  }

  // Render the protected element if the user is authenticated and has the correct role
  return element;
};

export default ProtectedRoute;
