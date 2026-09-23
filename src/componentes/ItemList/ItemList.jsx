import Item from '../Item/Item';
import styles from './ItemList.module.css';

function ItemList({ productos }) {
  if (productos.length === 0) {
    return <p className="mensaje">No hay productos para mostrar.</p>;
  }

  return (
    <div className={styles.grilla}>
      {productos.map((prod) => (
        <Item key={prod.id} {...prod} />
      ))}
    </div>
  );
}

export default ItemList;
