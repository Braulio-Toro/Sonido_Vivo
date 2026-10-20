import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatearPrecio } from '../data/productos';
import { porcentajeCupon, calcularTotal } from '../utils/carrito';

function ResumenCarrito({ subtotal, onPagar }) {
  const [codigo, setCodigo] = useState('');
  const [porcentaje, setPorcentaje] = useState(0);
  const [mensaje, setMensaje] = useState('');

  const aplicar = () => {
    const p = porcentajeCupon(codigo);
    setPorcentaje(p);
    setMensaje(p ? `Cupón aplicado: ${p}% de descuento.` : 'Cupón no válido.');
  };

  return (
    <aside className="carrito-compras__resumen">
      <h2 className="carrito-compras__resumen-titulo">Resumen del pedido</h2>
      <div className="carrito-compras__linea"><span>Subtotal</span><span>{formatearPrecio(subtotal)}</span></div>
      {porcentaje > 0 && (
        <div className="carrito-compras__linea">
          <span>Descuento ({porcentaje}%)</span>
          <span>-{formatearPrecio(subtotal - calcularTotal(subtotal, porcentaje))}</span>
        </div>
      )}
      <div className="carrito-compras__linea"><span>Envío</span><span>Calculado al pagar</span></div>
      <div className="carrito-compras__cupon">
        <label htmlFor="cupon" className="visually-hidden">Cupón de descuento</label>
        <input type="text" id="cupon" placeholder="Ingresa el cupón de descuento" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        <button type="button" className="boton boton--secundario" onClick={aplicar}>Aplicar</button>
      </div>
      {mensaje && <p className="mensaje-exito" role="status">{mensaje}</p>}
      <div className="carrito-compras__total">
        <span>Total</span>
        <strong>{formatearPrecio(calcularTotal(subtotal, porcentaje))}</strong>
      </div>
      <button type="button" className="boton boton--principal carrito-compras__boton-pagar" onClick={onPagar}>Pagar</button>
      <Link to="/productos" className="carrito-compras__seguir">← Seguir comprando</Link>
    </aside>
  );
}

export default ResumenCarrito;