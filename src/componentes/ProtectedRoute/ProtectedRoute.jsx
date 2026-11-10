import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children, rolesPermitidos }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
    return (
      <div className="mensaje">
        <h2>Acceso restringido</h2>
        <p>Esta sección es solo para administradores.</p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
