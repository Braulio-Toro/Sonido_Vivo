import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function RutaPrivada({ children, rol }) {
  const { estaLogueado, usuario } = useAuth();
  const location = useLocation();
  if (!estaLogueado) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (rol && usuario?.rol !== rol) return <Navigate to="/perfil" replace />;
  return children;
}

export default RutaPrivada;