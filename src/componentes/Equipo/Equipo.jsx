import { useEffect, useState } from 'react';
import TarjetaContacto from '../TarjetaContacto/TarjetaContacto';
import styles from './Equipo.module.css';

function Equipo() {
  const [nosotros, setNosotros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/nosotros.json')
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('No se pudo cargar el equipo');
        return respuesta.json();
      })
      .then((datos) => setNosotros(datos))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p className={styles.estado}>Cargando equipo...</p>;
  if (error) return <p className={`${styles.estado} mensaje-error`}>Error: {error}</p>;

  return (
    <section className={styles.equipo}>
      <h3>Nuestro equipo</h3>
      <div className={styles.grilla}>
        {nosotros.map((persona) => (
          <TarjetaContacto key={persona.id} {...persona} />
        ))}
      </div>
    </section>
  );
}

export default Equipo;
