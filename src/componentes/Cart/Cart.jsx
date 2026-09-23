import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatearPrecio } from '../../utils/formatearPrecio';
import styles from './Cart.module.css';

function Cart() {
  const { cart, removeFromCart, clearCart, getCartTotal, getCartQuantity } = useCart();
  const [compra, setCompra] = useState(null);

  const finalizarCompra = () => {
    setCompra({
      numero: Math.floor(100000 + Math.random() * 900000),
      cantidad: getCartQuantity(),
      total: getCartTotal(),
    });
    clearCart();
  };

  if (compra) {
    return (
      <div className={styles.confirmacion}>
        <span className={styles.check}>✔</span>
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu número de orden es <strong>#{compra.numero}</strong>.</p>
        <p>
          Compraste {compra.cantidad} {compra.cantidad === 1 ? 'producto' : 'productos'} por un total de{' '}
          <strong>{formatearPrecio(compra.total)}</strong>.
        </p>
        <Link to="/productos" className="btn" style={{ color: '#fff' }}>Seguir comprando</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mensaje">
        <h2>El carrito está vacío</h2>
        <p>Agregá productos para continuar la compra.</p>
        <p style={{ marginTop: '1rem' }}>
          <Link to="/productos" className="btn" style={{ color: '#fff' }}>Ver productos</Link>
        </p>
      </div>
    );
  }

  return (
    <section>
      <h2 className={styles.titulo}>Carrito de compras</h2>

      <ul className={styles.lista}>
        {cart.map((item) => (
          <li key={item.id} className={styles.item}>
            <img src={item.imagen} alt={item.nombre} className={styles.imagen} />
            <div className={styles.datos}>
              <Link to={`/producto/${item.id}`}><h4>{item.nombre}</h4></Link>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio unitario: {formatearPrecio(item.precio)}</p>
            </div>
            <div className={styles.subtotal}>
              <p>{formatearPrecio(item.precio * item.quantity)}</p>
              <button className={styles.quitar} onClick={() => removeFromCart(item.id)}>
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.resumen}>
        <h3>Total: {formatearPrecio(getCartTotal())}</h3>
        <div className={styles.botones}>
          <button className="btn-secundario" onClick={clearCart}>Vaciar carrito</button>
          <button className="btn" onClick={finalizarCompra}>
            Finalizar compra
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
