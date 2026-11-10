import styles from './Spinner.module.css';

function Spinner({ texto = 'Cargando...' }) {
  return (
    <div className={styles.contenedor} role="status">
      <span className={styles.spinner} aria-hidden="true"></span>
      <p>{texto}</p>
    </div>
  );
}

export default Spinner;
