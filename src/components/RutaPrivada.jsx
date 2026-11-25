import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function RutaPrivada({ children }) {
  const { estaLogueado } = useAuth();
  const location = useLocation();
  if (!estaLogueado) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}

export default RutaPrivada;