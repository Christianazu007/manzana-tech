import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CartWidget from '../CartWidget/CartWidget';
import styles from './NavBar.module.css';

function NavBar() {
  const { user } = useAuth();
  const claseLink = ({ isActive }) => (isActive ? `${styles.link} ${styles.activo}` : styles.link);

  return (
    <nav>
      <ul className={styles.nav}>
        <li><NavLink to="/" end className={claseLink}>Inicio</NavLink></li>
        <li><NavLink to="/productos" className={claseLink}>Productos</NavLink></li>
        {user?.rol === 'admin' && (
          <li><NavLink to="/gestion" className={claseLink}>Gestión</NavLink></li>
        )}
        <li>
          {user ? (
            <NavLink to="/perfil" className={claseLink}>Mi perfil</NavLink>
          ) : (
            <NavLink to="/login" className={claseLink}>Ingresar</NavLink>
          )}
        </li>
        <li><CartWidget /></li>
      </ul>
    </nav>
  );
}

export default NavBar;
