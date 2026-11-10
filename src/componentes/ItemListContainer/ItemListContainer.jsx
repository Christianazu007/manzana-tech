import { useEffect, useState } from 'react';
import { collection, getDocsFromServer } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { traducirError } from '../../utils/erroresFirebase';
import ItemList from '../ItemList/ItemList';
import Paginador from '../Paginador/Paginador';
import Spinner from '../Spinner/Spinner';
import styles from './ItemListContainer.module.css';

const PRODUCTOS_POR_PAGINA = 12;

function ItemListContainer({ titulo, soloDestacados = false, conBuscador = false }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    getDocsFromServer(collection(db, 'productos'))
      .then((respuesta) => {
        const datos = respuesta.docs.map((d) => ({ ...d.data(), id: d.id }));
        setProductos(soloDestacados ? datos.filter((p) => p.destacado).slice(0, 4) : datos);
      })
      .catch((err) => setError(traducirError(err)))
      .finally(() => setCargando(false));
  }, [soloDestacados]);

  if (cargando) return <Spinner texto="Cargando productos..." />;
  if (error) return <p className="mensaje mensaje-error">Error: {error}</p>;

  const texto = busqueda.trim().toLowerCase();
  const productosFiltrados = productos.filter(
    (prod) =>
      prod.nombre.toLowerCase().includes(texto) ||
      prod.categoria.toLowerCase().includes(texto)
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);
  const inicio = (pagina - 1) * PRODUCTOS_POR_PAGINA;
  const productosPagina = conBuscador
    ? productosFiltrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA)
    : productosFiltrados;

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPagina(1);
  };

  const cambiarPagina = (numero) => {
    setPagina(numero);
    window.scrollTo(0, 0);
  };

  return (
    <section>
      <div className={styles.encabezado}>
        {titulo && <h2 className={styles.titulo}>{titulo}</h2>}
        {conBuscador && (
          <input
            type="search"
            className={styles.buscador}
            placeholder="Buscar por nombre o categoría..."
            value={busqueda}
            onChange={manejarBusqueda}
            aria-label="Buscar productos"
          />
        )}
      </div>

      {productos.length === 0 ? (
        <p className="mensaje">Todavía no hay productos cargados.</p>
      ) : productosFiltrados.length === 0 ? (
        <p className="mensaje">No encontramos productos para "{busqueda}".</p>
      ) : (
        <>
          <ItemList productos={productosPagina} />
          {conBuscador && (
            <Paginador paginaActual={pagina} totalPaginas={totalPaginas} onCambiarPagina={cambiarPagina} />
          )}
        </>
      )}
    </section>
  );
}

export default ItemListContainer;
