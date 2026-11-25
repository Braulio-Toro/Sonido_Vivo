import SelectorCantidad from './SelectorCantidad';
import { formatearPrecio } from '../data/productos';

function ItemCarrito({ item, onCambiar, onEliminar }) {
  return (
    <article className="item-carrito">
      <img src={item.imagen} alt={item.nombre} className="item-carrito__imagen" />
      <div className="item-carrito__info">
        <h3 className="item-carrito__nombre">{item.nombre}</h3>
        <button type="button" className="item-carrito__eliminar" aria-label="Eliminar producto del carrito" onClick={() => onEliminar(item.id)}>
          Eliminar
        </button>
      </div>
      <div className="item-carrito__precio-unitario">{formatearPrecio(item.precio)}</div>
      <SelectorCantidad valor={item.cantidad} onCambio={(n) => onCambiar(item.id, n)} />
      <div className="item-carrito__subtotal">{formatearPrecio(item.precio * item.cantidad)}</div>
    </article>
  );
}

export default ItemCarrito;