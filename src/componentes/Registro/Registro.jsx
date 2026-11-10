import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { traducirError } from '../../utils/erroresFirebase';
import styles from '../Login/Login.module.css';

function Registro() {
  const { registro } = useAuth();
  const navigate = useNavigate();
  const [datos, setDatos] = useState({ email: '', password: '', confirmacion: '' });
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    if (!datos.email.trim()) {
      setError('Ingresá un email.');
      return;
    }
    if (datos.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (datos.password !== datos.confirmacion) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setEnviando(true);
    try {
      await registro(datos.email, datos.password);
      navigate('/perfil', { replace: true });
    } catch (err) {
      setError(traducirError(err));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className={styles.contenedor}>
      <form className={styles.formulario} onSubmit={manejarEnvio}>
        <h2>Crear cuenta</h2>

        <label className="campo">
          <span>Email</span>
          <input type="email" name="email" value={datos.email} onChange={manejarCambio} placeholder="tu@email.com" />
        </label>

        <label className="campo">
          <span>Contraseña</span>
          <input type="password" name="password" value={datos.password} onChange={manejarCambio} placeholder="Mínimo 6 caracteres" />
        </label>

        <label className="campo">
          <span>Repetir contraseña</span>
          <input type="password" name="confirmacion" value={datos.confirmacion} onChange={manejarCambio} />
        </label>

        {error && <p className="texto-error">{error}</p>}

        <button type="submit" className="btn" disabled={enviando}>
          {enviando ? 'Creando cuenta...' : 'Registrarme'}
        </button>

        <p className={styles.alternativa}>
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </form>
    </section>
  );
}

export default Registro;
