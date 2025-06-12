import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface RotaPrivadaProps {
  children: React.ReactNode;
}

const RotaPrivada = ({ children }: RotaPrivadaProps) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RotaPrivada;
