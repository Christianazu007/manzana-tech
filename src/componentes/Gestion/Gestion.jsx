import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocsFromServer, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { formatearPrecio } from '../../utils/formatearPrecio';
import { traducirError } from '../../utils/erroresFirebase';
import FormularioProducto from '../FormularioProducto/FormularioProducto';
import ModalConfirmacion from '../ModalConfirmacion/ModalConfirmacion';
import Spinner from '../Spinner/Spinner';
import styles from './Gestion.module.css';

const estadoInicialForm = {
  nombre: '',
  categoria: 'iPhone',
  precio: '',
  stock: '',
  imagen: '',
  descripcion: '',
  destacado: false,
};

const validar = (datos) => {
  const errores = {};
  if (!datos.nombre.trim()) errores.nombre = 'El nombre es obligatorio.';
  if (datos.precio === '' || Number(datos.precio) <= 0) errores.precio = 'El precio debe ser mayor que cero.';
  if (datos.stock === '' || Number(datos.stock) < 0 || !Number.isInteger(Number(datos.stock))) {
    errores.stock = 'El stock debe ser un número entero igual o mayor que cero.';
  }
  if (!datos.imagen.trim()) errores.imagen = 'Ingresá la URL de una imagen.';
  return errores;
};

function Gestion() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState('');
  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  const [errores, setErrores] = useState({});
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const leerProductos = async () => {
    const respuesta = await getDocsFromServer(collection(db, 'productos'));
    return respuesta.docs.map((d) => ({ ...d.data(), id: d.id }));
  };

  useEffect(() => {
    leerProductos()
      .then((datos) => setProductos(datos))
      .catch((err) => setError(traducirError(err)))
      .finally(() => setCargando(false));
  }, []);

  const mostrarAviso = (texto) => {
    setAviso(texto);
    setTimeout(() => setAviso(''), 3000);
  };

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosForm({ ...datosForm, [name]: type === 'checkbox' ? checked : value });
  };

  const handleEditClick = (producto) => {
    setProductoAEditar(producto);
    setDatosForm({ ...estadoInicialForm, ...producto });
    setErrores({});
    window.scrollTo(0, 0);
  };

  const cancelarEdicion = () => {
    setProductoAEditar(null);
    setDatosForm(estadoInicialForm);
    setErrores({});
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const nuevosErrores = validar(datosForm);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const producto = {
      nombre: datosForm.nombre.trim(),
      categoria: datosForm.categoria,
      precio: Number(datosForm.precio),
      stock: Number(datosForm.stock),
      imagen: datosForm.imagen.trim(),
      descripcion: datosForm.descripcion.trim(),
      destacado: datosForm.destacado,
    };

    setGuardando(true);
    setError('');
    try {
      if (productoAEditar) {
        await updateDoc(doc(db, 'productos', productoAEditar.id), producto);
        setProductos(productos.map((p) => (p.id === productoAEditar.id ? { ...producto, id: p.id } : p)));
        mostrarAviso('Producto actualizado.');
      } else {
        const nuevo = await addDoc(collection(db, 'productos'), producto);
        setProductos([...productos, { ...producto, id: nuevo.id }]);
        mostrarAviso('Producto agregado.');
      }
      cancelarEdicion();
    } catch (err) {
      setError(traducirError(err));
    } finally {
      setGuardando(false);
    }
  };

  const confirmarEliminacion = async () => {
    setEliminando(true);
    setError('');
    try {
      await deleteDoc(doc(db, 'productos', productoAEliminar.id));
      setProductos(productos.filter((p) => p.id !== productoAEliminar.id));
      if (productoAEditar?.id === productoAEliminar.id) cancelarEdicion();
      mostrarAviso('Producto eliminado.');
      setProductoAEliminar(null);
    } catch (err) {
      setError(traducirError(err));
    } finally {
      setEliminando(false);
    }
  };

  const importarProductos = async () => {
    setGuardando(true);
    setError('');
    try {
      const respuesta = await fetch('/data/productos.json');
      const datos = await respuesta.json();
      const nombresActuales = productos.map((p) => p.nombre.toLowerCase());
      const nuevos = datos.filter((item) => !nombresActuales.includes(item.nombre.toLowerCase()));
      if (nuevos.length === 0) {
        mostrarAviso('No hay productos nuevos para importar.');
        return;
      }
      const lote = writeBatch(db);
      nuevos.forEach((item) => {
        const producto = { ...item };
        delete producto.id;
        lote.set(doc(collection(db, 'productos')), producto);
      });
      await lote.commit();
      setProductos(await leerProductos());
      mostrarAviso(`Se importaron ${nuevos.length} productos.`);
    } catch (err) {
      setError(traducirError(err));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <section className={styles.gestion}>
      <h2>Gestión de productos</h2>

      {aviso && <p className={styles.aviso}>{aviso}</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      <FormularioProducto
        datosForm={datosForm}
        errores={errores}
        modoEdicion={!!productoAEditar}
        guardando={guardando}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        cancelarEdicion={cancelarEdicion}
      />

      <div className={styles.encabezadoLista}>
        <h3>Productos ({productos.length})</h3>
        {!cargando && productos.length > 0 && (
          <button className="btn-secundario" onClick={importarProductos} disabled={guardando}>
            {guardando ? 'Importando...' : 'Importar productos de ejemplo'}
          </button>
        )}
      </div>

      {cargando ? (
        <Spinner texto="Cargando productos..." />
      ) : productos.length === 0 ? (
        <div className={styles.vacio}>
          <p>Todavía no hay productos en la base de datos.</p>
          <button className="btn" onClick={importarProductos} disabled={guardando}>
            {guardando ? 'Importando...' : 'Importar productos de ejemplo'}
          </button>
        </div>
      ) : (
        <ul className={styles.lista}>
          {productos.map((prod) => (
            <li key={prod.id} className={styles.item}>
              <img src={prod.imagen} alt={prod.nombre} className={styles.miniatura} />
              <div className={styles.info}>
                <strong>{prod.nombre}</strong>
                <span>{prod.categoria} · {formatearPrecio(prod.precio)} · Stock: {prod.stock}</span>
              </div>
              <div className={styles.acciones}>
                <button className={styles.editar} onClick={() => handleEditClick(prod)}>Editar</button>
                <button className={styles.eliminar} onClick={() => setProductoAEliminar(prod)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ModalConfirmacion
        abierto={!!productoAEliminar}
        titulo="Eliminar producto"
        mensaje={`¿Seguro que querés eliminar "${productoAEliminar?.nombre}"? Esta acción no se puede deshacer.`}
        textoConfirmar="Eliminar"
        procesando={eliminando}
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setProductoAEliminar(null)}
      />
    </section>
  );
}

export default Gestion;
