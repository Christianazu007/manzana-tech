import styles from './TarjetaContacto.module.css';

function TarjetaContacto({ nombre, puesto, email, foto }) {
  return (
    <article className={styles.tarjeta}>
      <img src={foto} alt={nombre} className={styles.foto} />
      <div>
        <h4>{nombre}</h4>
        <p className={styles.puesto}>{puesto}</p>
        <a href={`mailto:${email}`} className={styles.email}>{email}</a>
      </div>
    </article>
  );
}

export default TarjetaContacto;
