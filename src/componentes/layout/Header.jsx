import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.contenido}>
        <Link to="/" className={styles.logo}>Manzana Tech</Link>
        <NavBar />
      </div>
    </header>
  );
}

export default Header;
