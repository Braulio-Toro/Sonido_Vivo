import { useState } from 'react';
import { Link } from 'react-router-dom';
import MigaPan from './MigaPan';
import SelectorCantidad from './SelectorCantidad';
import { useCart } from '../hooks/useCart';
import { useProductos } from '../hooks/useProductos';
import { formatearPrecio } from '../data/productos';

function DetalleProducto({ producto }) {
  const { agregar } = useCart();
  const { favoritos, toggleFavorito } = useProductos();
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [detallesAbiertos, setDetallesAbiertos] = useState(false);
  const esFavorito = favoritos.includes(producto.id);

  const enviar = (e) => {
    e.preventDefault();
    agregar({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, cantidad });
    setMensaje(`✓ ${cantidad} ${cantidad === 1 ? 'unidad añadida' : 'unidades añadidas'} al carrito.`);
  };

  const datos = [
    ['Categoría', producto.categoria],
    ['Marca', producto.marca],
    ['Código', producto.codigo],
    ['Stock', `${producto.stock} unidades`],
  ];

  return (
    <>
      <MigaPan items={[{ texto: 'Productos', to: '/productos' }, { texto: producto.categoria }]} />
      <section className="seccion detalle-producto" aria-labelledby="producto-nombre">
        <div className="contenedor">
          <div className="detalle-producto__grid">
            <div className="detalle-producto__imagen">
              <div className="detalle-producto__imagen-marco">
                <img src={producto.imagen} alt={producto.nombre} />
              </div>
            </div>

            <div className="detalle-producto__informacion">
              <p className="eyebrow">{producto.categoria}</p>
              <h1 id="producto-nombre" className="detalle-producto__titulo">{producto.nombre}</h1>
              <p className="detalle-producto__codigo">Código: {producto.codigo}</p>
              <p className="detalle-producto__descripcion">{producto.descripcion}</p>

              <div className="detalle-producto__precio">
                <strong>{formatearPrecio(producto.precio)}</strong>
                <span>Precio final</span>
                <button
                  type="button"
                  className="boton-favorito"
                  style={{ position: 'static' }}
                  aria-pressed={esFavorito}
                  aria-label={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  onClick={() => toggleFavorito(producto.id)}
                >
                  {esFavorito ? '♥' : '♡'}
                </button>
              </div>

              <div className="producto__disponibilidad">
                <span className="producto__disponibilidad-punto"></span>
                {producto.stock > 0 ? 'Producto disponible' : 'Sin stock'}
              </div>

              <form className="producto__compra" onSubmit={enviar}>
                <div className="producto__cantidad">
                  <label htmlFor="cantidad">Cantidad</label>
                  <SelectorCantidad variante="producto" idInput="cantidad" valor={cantidad} onCambio={setCantidad} />
                </div>
                <div className="producto__total">
                  <span>Total</span>
                  <strong>{formatearPrecio(producto.precio * cantidad)}</strong>
                </div>
                <button type="submit" className="boton boton--principal producto__boton" disabled={producto.stock === 0}>
                  Añadir al carrito
                </button>
                <div className="producto__mensaje" aria-live="polite">{mensaje}</div>
              </form>

              <div className="producto__extra">
                <button
                  type="button"
                  className="producto__extra-boton"
                  aria-expanded={detallesAbiertos}
                  aria-controls="detallesTecnicos"
                  onClick={() => setDetallesAbiertos(!detallesAbiertos)}
                >
                  <span>Información del producto</span>
                  <span id="iconoDetalles">{detallesAbiertos ? '−' : '+'}</span>
                </button>
                {detallesAbiertos && (
                  <div className="producto__extra-contenido" id="detallesTecnicos">
                    {datos.map(([etiqueta, valor]) => (
                      <div className="producto__dato" key={etiqueta}>
                        <span>{etiqueta}</span>
                        <strong>{valor}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="producto__beneficios">
                <div><span>✓</span>Envíos a todo Chile</div>
                <div><span>✓</span>Retiro en tienda</div>
                <div><span>✓</span>Compra segura</div>
              </div>
            </div>
          </div>
          <div className="detalle-producto__volver">
            <Link to="/productos" className="carrito-compras__seguir">← Volver al catálogo</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetalleProducto;