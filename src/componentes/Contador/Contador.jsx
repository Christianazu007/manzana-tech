import styles from './Contador.module.css';

function Contador({ cantidad, stock, onIncrementar, onDecrementar }) {
  return (
    <div className={styles.contador}>
      <button onClick={onDecrementar} disabled={cantidad <= 1} aria-label="Restar">−</button>
      <span>{cantidad}</span>
      <button onClick={onIncrementar} disabled={cantidad >= stock} aria-label="Sumar">+</button>
    </div>
  );
}

export default Contador;
