import { Link } from 'react-router-dom';

function TarjetaBlog({ blog }) {
  const ruta = `/blogs/${blog.slug}`;
  return (
    <article className="tarjeta-blog">
      <Link to={ruta} className="tarjeta-blog__imagen">
        <img src={blog.imagen} alt={blog.alt} style={{ objectPosition: blog.objectPosition }} />
      </Link>
      <div className="tarjeta-blog__cuerpo">
        <h2 className="tarjeta-blog__titulo"><Link to={ruta}>{blog.tituloTarjeta}</Link></h2>
        <p className="tarjeta-blog__resumen">{blog.resumen}</p>
        <Link to={ruta} className="tarjeta-blog__boton">Ver caso</Link>
      </div>
    </article>
  );
}

export default TarjetaBlog;