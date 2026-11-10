import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { traducirError } from '../../utils/erroresFirebase';
import styles from './Login.module.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Completá el email y la contraseña.');
      return;
    }
    setEnviando(true);
    try {
      await login(email, password);
      navigate(location.state?.desde ?? '/perfil', { replace: true });
    } catch (err) {
      setError(traducirError(err));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className={styles.contenedor}>
      <form className={styles.formulario} onSubmit={manejarEnvio}>
        <h2>Iniciar sesión</h2>

        <label className="campo">
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" />
        </label>

        <label className="campo">
          <span>Contraseña</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
        </label>

        {error && <p className="texto-error">{error}</p>}

        <button type="submit" className="btn" disabled={enviando}>
          {enviando ? 'Ingresando...' : 'Ingresar'}
        </button>

        <p className={styles.alternativa}>
          ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
