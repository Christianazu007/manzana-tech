import styles from './FormularioProducto.module.css';

const categorias = ['iPhone', 'Mac', 'iPad', 'Watch', 'AirPods'];

function FormularioProducto({ datosForm, errores, modoEdicion, guardando, manejarCambio, manejarEnvio, cancelarEdicion }) {
  const claseCampo = (campo) => (errores[campo] ? 'campo campo-invalido' : 'campo');

  return (
    <form className={styles.formulario} onSubmit={manejarEnvio} noValidate>
      <h3>{modoEdicion ? 'Editar producto' : 'Agregar nuevo producto'}</h3>

      <div className={styles.grilla}>
        <label className={claseCampo('nombre')}>
          <span>Nombre *</span>
          <input type="text" name="nombre" value={datosForm.nombre} onChange={manejarCambio} placeholder="Ej: iPhone 16" />
          {errores.nombre && <small className="texto-error">{errores.nombre}</small>}
        </label>

        <label className="campo">
          <span>Categoría</span>
          <select name="categoria" value={datosForm.categoria} onChange={manejarCambio}>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label className={claseCampo('precio')}>
          <span>Precio *</span>
          <input type="number" name="precio" value={datosForm.precio} onChange={manejarCambio} min="1" placeholder="Ej: 1500000" />
          {errores.precio && <small className="texto-error">{errores.precio}</small>}
        </label>

        <label className={claseCampo('stock')}>
          <span>Stock *</span>
          <input type="number" name="stock" value={datosForm.stock} onChange={manejarCambio} min="0" placeholder="Ej: 10" />
          {errores.stock && <small className="texto-error">{errores.stock}</small>}
        </label>

        <label className={`${claseCampo('imagen')} ${styles.ancho}`}>
          <span>Imagen (URL) *</span>
          <input type="text" name="imagen" value={datosForm.imagen} onChange={manejarCambio} placeholder="Ej: /images/iphone.png o https://..." />
          {errores.imagen && <small className="texto-error">{errores.imagen}</small>}
        </label>

        <label className={`${claseCampo('descripcion')} ${styles.ancho}`}>
          <span>Descripción</span>
          <textarea name="descripcion" value={datosForm.descripcion} onChange={manejarCambio} rows="3" />
        </label>

        <label className={styles.check}>
          <input type="checkbox" name="destacado" checked={datosForm.destacado} onChange={manejarCambio} />
          <span>Mostrar en destacados</span>
        </label>
      </div>

      {datosForm.imagen && (
        <img src={datosForm.imagen} alt="Vista previa" className={styles.preview} />
      )}

      <div className={styles.botones}>
        {modoEdicion && (
          <button type="button" className="btn-secundario" onClick={cancelarEdicion}>
            Cancelar edición
          </button>
        )}
        <button type="submit" className="btn" disabled={guardando}>
          {guardando ? 'Guardando...' : modoEdicion ? 'Actualizar producto' : 'Guardar producto'}
        </button>
      </div>
    </form>
  );
}

export default FormularioProducto;
