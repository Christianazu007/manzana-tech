import { NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import styles from './NavBar.module.css';

function NavBar() {
  const claseLink = ({ isActive }) => (isActive ? `${styles.link} ${styles.activo}` : styles.link);

  return (
    <nav>
      <ul className={styles.nav}>
        <li><NavLink to="/" end className={claseLink}>Inicio</NavLink></li>
        <li><NavLink to="/productos" className={claseLink}>Productos</NavLink></li>
        <li><CartWidget /></li>
      </ul>
    </nav>
  );
}

export default NavBar;
