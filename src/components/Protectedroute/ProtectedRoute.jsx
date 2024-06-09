import React from 'react';
import { Route, Navigate } from 'react-router-dom';
//import { useAuth } from './AuthContext';
import { useAuth } from '../AuthContext';

 const ProtectedRoute = ({ children } ) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
