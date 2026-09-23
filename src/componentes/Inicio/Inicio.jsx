import { Link } from 'react-router-dom';
import ItemListContainer from '../ItemListContainer/ItemListContainer';
import styles from './Inicio.module.css';

function Inicio() {
  return (
    <>
      <section className={styles.hero}>
        <h1>Lo último de Apple, al mejor precio.</h1>
        <p>iPhone, Mac, iPad, Apple Watch y AirPods con garantía oficial y envío a todo el país.</p>
        <Link to="/productos" className="btn" style={{ color: '#fff' }}>Ver todos los productos</Link>
      </section>

      <ItemListContainer titulo="Productos destacados" soloDestacados />
    </>
  );
}

export default Inicio;
