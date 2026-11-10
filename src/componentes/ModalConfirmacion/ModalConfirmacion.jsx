import styles from './ModalConfirmacion.module.css';

function ModalConfirmacion({ abierto, titulo, mensaje, textoConfirmar = 'Confirmar', procesando, onConfirmar, onCancelar }) {
  if (!abierto) return null;

  return (
    <div className={styles.fondo} onClick={onCancelar}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="titulo-modal">{titulo}</h3>
        <p>{mensaje}</p>
        <div className={styles.botones}>
          <button className="btn-secundario" onClick={onCancelar} disabled={procesando}>
            Cancelar
          </button>
          <button className="btn-peligro" onClick={onConfirmar} disabled={procesando}>
            {procesando ? 'Eliminando...' : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;
