import { Link } from 'react-router-dom';
import Equipo from '../Equipo/Equipo';
import Newsletter from '../Newsletter/Newsletter';
import styles from './Footer.module.css';

const sucursales = [
  { id: 1, nombre: 'Palermo', direccion: 'Av. Santa Fe 3253, CABA' },
  { id: 2, nombre: 'Microcentro', direccion: 'Av. Corrientes 1234, CABA' },
  { id: 3, nombre: 'Córdoba', direccion: 'Av. Colón 560, Córdoba' },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contenido}>
        <Equipo />

        <div className={styles.empresa}>
          <div>
            <h4>Manzana Tech</h4>
            <p>Tu tienda de productos Apple en Argentina.</p>
            <h4 className={styles.subtitulo}>Contacto</h4>
            <p>hola@manzanatech.com</p>
            <p>+54 11 5555-1234</p>
            <p>Lunes a viernes de 9 a 18 h</p>
          </div>

          <div>
            <h4>Sucursales</h4>
            <ul className={styles.lista}>
              {sucursales.map((sucursal) => (
                <li key={sucursal.id}>
                  <strong>{sucursal.nombre}</strong>
                  <span>{sucursal.direccion}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Información legal</h4>
            <ul className={styles.lista}>
              <li><Link to="/politicas">Políticas de privacidad</Link></li>
              <li><Link to="/politicas">Términos y condiciones</Link></li>
              <li><Link to="/politicas">Propiedad intelectual</Link></li>
              <li><Link to="/politicas">Cambios y devoluciones</Link></li>
            </ul>
          </div>

          <Newsletter />
        </div>

        <p className={styles.legal}>
          © {new Date().getFullYear()} Manzana Tech · Todos los derechos reservados. Revendedor independiente:
          Apple, iPhone, iPad, Mac, Apple Watch y AirPods son marcas registradas de Apple Inc.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
