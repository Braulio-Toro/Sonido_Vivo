import { Link } from 'react-router-dom';

function Footer({ reducido = false }) {
  return (
    <footer className="pie">
      {!reducido && (
        <div className="contenedor pie__grid">
          <div>
            <p className="pie__marca">Sonido Vivo</p>
            <p>Tienda de instrumentos y equipos musicales en Viña del Mar, Región de Valparaíso.</p>
          </div>
          <div>
            <h3>Tienda</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
            </ul>
          </div>
          <div>
            <h3>Mi cuenta</h3>
            <ul>
              <li><Link to="/login">Iniciar sesión</Link></li>
              <li><Link to="/registro">Registrar usuario</Link></li>
              <li><Link to="/carrito">Carrito de compras</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3>Novedades</h3>
            <p>Recibe nuestras ofertas y casos curiosos del blog.</p>
            <form className="pie__form" onSubmit={(e) => { e.preventDefault(); e.target.reset(); }}>
              <label htmlFor="correo-newsletter" className="visually-hidden">Correo electrónico</label>
              <input type="email" id="correo-newsletter" name="correo-newsletter" placeholder="tu@correo.com" />
              <button type="submit">Suscribir</button>
            </form>
          </div>
        </div>
      )}
      <div className="contenedor pie__inferior">
        <span>© 2026 Sonido Vivo. Todos los derechos reservados.</span>
        <span>Viña del Mar, Región de Valparaíso, Chile</span>
      </div>
    </footer>
  );
}

export default Footer;