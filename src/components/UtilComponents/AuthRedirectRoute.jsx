import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthRedirectRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.role === 'ADMIN') {
      return <Navigate to="/admin/clients" />;
    } else if (decoded.role === 'USER') {
      return <Navigate to="/clients" />;
    }
  }

  return element;
};

export default AuthRedirectRoute;