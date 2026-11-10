import styles from './Paginador.module.css';

function Paginador({ paginaActual, totalPaginas, onCambiarPagina }) {
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav className={styles.paginador} aria-label="Paginación de productos">
      <button onClick={() => onCambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
        Anterior
      </button>
      {paginas.map((numero) => (
        <button
          key={numero}
          onClick={() => onCambiarPagina(numero)}
          className={numero === paginaActual ? styles.activa : ''}
          aria-current={numero === paginaActual ? 'page' : undefined}
        >
          {numero}
        </button>
      ))}
      <button onClick={() => onCambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
        Siguiente
      </button>
    </nav>
  );
}

export default Paginador;
