import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartWidget.module.css';

function CartWidget() {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  return (
    <Link to="/carrito" className={styles.widget} aria-label={`Carrito: ${totalItems} productos`}>
      <span className={styles.icono}>🛒</span>
      {totalItems > 0 && <span className={styles.contador}>{totalItems}</span>}
    </Link>
  );
}

export default CartWidget;
