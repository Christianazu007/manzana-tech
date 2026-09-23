import { Link } from 'react-router-dom';

function NoEncontrado() {
  return (
    <div className="mensaje">
      <h2>404 – Página no encontrada</h2>
      <p><Link to="/">Volver al inicio</Link></p>
    </div>
  );
}

export default NoEncontrado;
