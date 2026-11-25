import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import logo from '../assets/img/logo2.png';

console.log('Logo importado:', logo);

function Header({ itemsMenu }) {
  const { usuario, estaLogueado, logout } = useAuth();
  const { unidades } = useCart();
  const [abierto, setAbierto] = useState(false); // menú hamburguesa responsivo
  const navigate = useNavigate();

  const cerrarSesion = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <header className="encabezado">
      <div className="encabezado__barra contenedor">
        <Link to="/" className="logo" aria-label="Sonido Vivo, ir al inicio">
          <img src={logo} alt="Sonido Vivo" className="logo__imagen" />
          <span className="logo__texto">
            Sonido Vivo
            <small>Instrumentos &amp; equipos musicales</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={abierto}
          aria-controls="navPrincipal"
          onClick={() => setAbierto(!abierto)}
        >
          ☰ <span className="visually-hidden">Abrir menú</span>
        </button>

        <nav className={`nav-principal ${abierto ? 'abierto' : ''}`} id="navPrincipal" aria-label="Navegación principal">
          <ul>
            {itemsMenu.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => (isActive ? 'activo' : '')}
                  onClick={() => setAbierto(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="encabezado__acciones">
          <div className="enlaces-cuenta">
            {estaLogueado ? (
              <>
                <Link to="/perfil">Hola, {usuario.nombre.split(' ')[0]}</Link>
                {usuario.rol === 'admin' && <Link to="/admin">Panel</Link>}
                <Link to="/" onClick={cerrarSesion}>Cerrar sesión</Link>
              </>
            ) : (
              <>
                <Link to="/login">Iniciar sesión</Link>
                <Link to="/registro">Registrar usuario</Link>
              </>
            )}
          </div>
          <Link to="/carrito" className="carrito" aria-label="Ver carrito de compras">
            <span className="carrito__icono" aria-hidden="true">🛒</span>
            <span>Cart ({unidades})</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;