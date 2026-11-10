import { Routes, Route } from 'react-router-dom';
import Layout from './componentes/layout/Layout';
import Inicio from './componentes/Inicio/Inicio';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import ProductoDetalle from './componentes/ProductoDetalle/ProductoDetalle';
import Cart from './componentes/Cart/Cart';
import Politicas from './componentes/Politicas/Politicas';
import Login from './componentes/Login/Login';
import Registro from './componentes/Registro/Registro';
import Perfil from './componentes/Perfil/Perfil';
import Gestion from './componentes/Gestion/Gestion';
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute';
import NoEncontrado from './componentes/NoEncontrado/NoEncontrado';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ItemListContainer titulo="Todos los productos" conBuscador />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion"
          element={
            <ProtectedRoute rolesPermitidos={['admin']}>
              <Gestion />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}

export default App;
