import { useState } from 'react';
import styles from './Newsletter.module.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setError(true);
      setMensaje('Ingresá un email válido.');
      return;
    }
    setError(false);
    setMensaje(`¡Listo! Te vamos a escribir a ${email}.`);
    setEmail('');
  };

  return (
    <div>
      <h4>Newsletter</h4>
      <p>Recibí lanzamientos y ofertas exclusivas.</p>
      <form className={styles.form} onSubmit={manejarEnvio}>
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          aria-label="Email"
        />
        <button type="submit" className="btn">Suscribirme</button>
      </form>
      {mensaje && <p className={error ? styles.error : styles.ok}>{mensaje}</p>}
    </div>
  );
}

export default Newsletter;
