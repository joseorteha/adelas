import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

// Componente optimizado para evitar bucles infinitos
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const location = useLocation();
  
  // Verificación directa sin estados para evitar re-renderizaciones
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');
  
  const isAuthenticated = !!token;
  const isAdmin = userRole === 'admin';

  if (!isAuthenticated) {
    // Redirigir a login si no está autenticado
    return <Navigate to={`/login?redirect=${location.pathname.substring(1)}`} state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirigir a página principal si requiere admin pero el usuario no lo es
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Si está autenticado y tiene los permisos necesarios, mostrar la ruta protegida
  return <>{children}</>;
};

export default ProtectedRoute;
