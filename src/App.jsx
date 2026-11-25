import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import RutaPrivada from './components/RutaPrivada';
import Home from './views/Home';
import Productos from './views/Productos';
import Producto from './views/Producto';
import Login from './views/Login';
import Registro from './views/Registro';
import Admin from './views/Admin';
import Carrito from './views/Carrito';
import Perfil from './views/Perfil';
import Nosotros from './views/Nosotros';
import Blogs from './views/Blogs';
import BlogDetalle from './views/BlogDetalle';
import Contacto from './views/Contacto';
import NotFound from './views/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<Producto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetalle />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/perfil" element={<RutaPrivada><Perfil /></RutaPrivada>} />
        <Route path="/admin" element={<RutaPrivada><Admin /></RutaPrivada>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;