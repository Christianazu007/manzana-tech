import { useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';
import styles from './ItemListContainer.module.css';

function ItemListContainer({ titulo, soloDestacados = false }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/productos.json')
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('No se pudo cargar la información de los productos');
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(soloDestacados ? datos.filter((p) => p.destacado) : datos);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [soloDestacados]);

  if (cargando) return <p className="mensaje">Cargando productos, por favor esperá...</p>;
  if (error) return <p className="mensaje mensaje-error">Error: {error}</p>;

  return (
    <section>
      {titulo && <h2 className={styles.titulo}>{titulo}</h2>}
      <ItemList productos={productos} />
    </section>
  );
}

export default ItemListContainer;
