import { Link } from 'react-router-dom';
import { formatearPrecio } from '../../utils/formatearPrecio';
import styles from './Item.module.css';

function Item({ id, nombre, categoria, precio, stock, imagen }) {
  return (
    <article className={styles.card}>
      <Link to={`/producto/${id}`} className={styles.imagenLink}>
        <img src={imagen} alt={nombre} className={styles.imagen} />
      </Link>
      <div className={styles.cuerpo}>
        <span className={styles.categoria}>{categoria}</span>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.precio}>{formatearPrecio(precio)}</p>
        {stock === 0 && <p className={styles.sinStock}>Sin stock</p>}
        <Link to={`/producto/${id}`} className={`btn ${styles.boton}`}>
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

export default Item;
