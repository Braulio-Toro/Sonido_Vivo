import { Link, useNavigate } from 'react-router-dom';
import Seccion from '../components/Seccion';
import { useAuth } from '../hooks/useAuth';
import { useProductos } from '../hooks/useProductos';

function Perfil() {
  const { usuario, logout } = useAuth();
  const { productos, favoritos } = useProductos();
  const navigate = useNavigate();
  const misFavoritos = productos.filter((p) => favoritos.includes(p.id));

  const datos = [
    ['Nombre', usuario.nombre],
    ['RUT', usuario.rut],
    ['Correo', usuario.correo],
    ['Teléfono', usuario.fono || 'No informado'],
    ['Fecha de nacimiento', usuario.fenac],
    ['Instrumento principal', usuario.instrumento],
    ['Nivel', usuario.nivel],
    ['Rol', usuario.rol],
  ];

  return (
    <Seccion id="perfil-titulo" eyebrow="Tu cuenta" titulo="Mi perfil" h1>
      <div className="tarjeta-login" style={{ maxWidth: 560, margin: '0 auto' }}>
        {datos.map(([etiqueta, valor]) => (
          <div className="producto__dato" key={etiqueta}>
            <span>{etiqueta}</span>
            <strong>{valor}</strong>
          </div>
        ))}

        <h2 className="carrito-compras__resumen-titulo" style={{ marginTop: '1.5rem' }}>Mis favoritos</h2>
        {misFavoritos.length ? (
          <ul className="nosotros__lista">
            {misFavoritos.map((p) => <li key={p.id}><Link to={`/productos/${p.id}`}>{p.nombre}</Link></li>)}
          </ul>
        ) : <p>Aún no tienes productos favoritos.</p>}

        <div className="hero__acciones" style={{ marginTop: '1.5rem' }}>
          {usuario.rol === 'admin' && <Link to="/admin" className="boton boton--principal">Panel de control</Link>}
          <button type="button" className="boton boton--secundario" onClick={() => { logout(); navigate('/'); }}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </Seccion>
  );
}

export default Perfil;