import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Perfil.module.css';

function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await logout();
    navigate('/');
  };

  return (
    <section className={styles.perfil}>
      <h2>¡Hola de nuevo!</h2>
      <p>Iniciaste sesión como <strong>{user.email}</strong>.</p>
      <p className={styles.rol}>Rol: {user.rol === 'admin' ? 'Administrador' : 'Cliente'}</p>

      <div className={styles.acciones}>
        {user.rol === 'admin' && (
          <Link to="/gestion" className="btn">Ir a gestión de productos</Link>
        )}
        <button className="btn-secundario" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>
    </section>
  );
}

export default Perfil;
