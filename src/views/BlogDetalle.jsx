import { Link, useParams } from 'react-router-dom';
import MigaPan from '../components/MigaPan';
import NotFound from './NotFound';
import { BLOGS } from '../data/blogs';

function BlogDetalle() {
  const { slug } = useParams();
  const blog = BLOGS.find((b) => b.slug === slug);
  if (!blog) return <NotFound />;

  return (
    <>
      <MigaPan items={[{ texto: 'Home', to: '/' }, { texto: 'Blogs', to: '/blogs' }, { texto: `Caso curioso #${blog.numero}` }]} />
      <article className="seccion detalle-blog">
        <div className="contenedor detalle-blog__contenido">
          <p className="eyebrow">Caso curioso #{blog.numero}</p>
          <h1 className="detalle-blog__titulo">{blog.titulo}</h1>
          <p className="detalle-blog__fecha">Publicado el {blog.fecha}</p>
          <img src={blog.imagen} alt={blog.alt} className="detalle-blog__imagen" />
          <div className="detalle-blog__texto">
            {blog.parrafos.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="detalle-blog__cta">
            <Link to="/blogs" className="boton boton--secundario">← Volver a blogs</Link>
            <Link to="/contacto" className="boton boton--principal">{blog.cta}</Link>
          </div>
        </div>
      </article>
    </>
  );
}

export default BlogDetalle;