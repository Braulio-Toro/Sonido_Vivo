import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="seccion">
      <div className="contenedor carrito-vacio">
        <p className="eyebrow">Error 404</p>
        <h1 className="tarjeta-login__titulo">Página no encontrada</h1>
        <p>La página que buscas no existe o fue movida.</p>
        <Link to="/" className="boton boton--principal">Volver al inicio</Link>
      </div>
    </section>
  );
}

export default NotFound;