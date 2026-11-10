import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { traducirError } from '../../utils/erroresFirebase';
import { useCarrito } from '../../context/CarritoContext';
import { formatearPrecio } from '../../utils/formatearPrecio';
import Contador from '../Contador/Contador';
import Spinner from '../Spinner/Spinner';
import styles from './ProductoDetalle.module.css';

function ProductoDetalle() {
  const { id } = useParams();
  const { addToCart, cart } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    getDocFromServer(doc(db, 'productos', id))
      .then((respuesta) => {
        setProducto(respuesta.exists() ? { ...respuesta.data(), id: respuesta.id } : null);
      })
      .catch((err) => setError(traducirError(err)))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <Spinner texto="Cargando producto..." />;
  if (error) return <p className="mensaje mensaje-error">Error: {error}</p>;
  if (!producto) {
    return (
      <div className="mensaje">
        <h2>Producto no encontrado</h2>
        <p><Link to="/productos">Volver al catálogo</Link></p>
      </div>
    );
  }

  const enCarrito = cart.find((item) => item.id === producto.id)?.quantity ?? 0;
  const disponible = producto.stock - enCarrito;

  const incrementar = () => cantidad < disponible && setCantidad(cantidad + 1);
  const decrementar = () => cantidad > 1 && setCantidad(cantidad - 1);

  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    setAgregado(true);
    setCantidad(1);
  };

  return (
    <article className={styles.detalle}>
      <img src={producto.imagen} alt={producto.nombre} className={styles.imagen} />

      <div className={styles.info}>
        <Link to="/productos" className={styles.volver}>← Volver al catálogo</Link>
        <span className={styles.categoria}>{producto.categoria}</span>
        <h1>{producto.nombre}</h1>
        <p className={styles.precio}>{formatearPrecio(producto.precio)}</p>
        <p className={styles.descripcion}>{producto.descripcion}</p>
        <p className={styles.stock}>
          {producto.stock === 0 ? 'Sin stock' : `Stock disponible: ${producto.stock}`}
        </p>

        {disponible > 0 ? (
          <div className={styles.acciones}>
            <Contador
              cantidad={cantidad}
              stock={disponible}
              onIncrementar={incrementar}
              onDecrementar={decrementar}
            />
            <button className="btn" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
          </div>
        ) : (
          producto.stock > 0 && <p className={styles.stock}>Ya agregaste todo el stock disponible.</p>
        )}

        {agregado && (
          <p className={styles.ok}>
            ✔ Producto agregado. <Link to="/carrito">Ir al carrito</Link>
          </p>
        )}
      </div>
    </article>
  );
}

export default ProductoDetalle;
