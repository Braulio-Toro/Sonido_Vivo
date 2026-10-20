import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProductos } from '../hooks/useProductos';
import { formatearPrecio } from '../data/productos';

function TarjetaProducto({ producto }) {
  const { agregar } = useCart();
  const { favoritos, toggleFavorito } = useProductos();
  const [anadido, setAnadido] = useState(false);
  const esFavorito = favoritos.includes(producto.id);

  const manejarAgregar = () => {
    agregar({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, cantidad: 1 });
    setAnadido(true);
    setTimeout(() => setAnadido(false), 1200);
  };

  return (
    <article className="tarjeta-producto">
      <button
        type="button"
        className="boton-favorito"
        aria-pressed={esFavorito}
        aria-label={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        onClick={() => toggleFavorito(producto.id)}
      >
        {esFavorito ? '♥' : '♡'}
      </button>
      <Link to={`/productos/${producto.id}`} className="tarjeta-producto__imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </Link>
      <div className="tarjeta-producto__cuerpo">
        <span className="tarjeta-producto__categoria">{producto.categoria}</span>
        <h3 className="tarjeta-producto__nombre">
          <Link to={`/productos/${producto.id}`}>{producto.nombre}</Link>
        </h3>
        <div className="tarjeta-producto__precio">
          <strong>{formatearPrecio(producto.precio)}</strong>
          <button className="tarjeta-producto__boton" type="button" onClick={manejarAgregar}>
            {anadido ? '¡Añadido!' : 'Añadir'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default TarjetaProducto;