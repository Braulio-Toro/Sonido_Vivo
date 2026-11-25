import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Seccion from '../components/Seccion';
import ItemCarrito from '../components/ItemCarrito';
import ResumenCarrito from '../components/ResumenCarrito';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import VentasService from '../services/VentasService';
import { calcularTotal } from '../utils/carrito';
import { mensajeDeError, ventaHaciaApi } from '../utils/api';

function Carrito() {
  const { carrito, cambiar, eliminar, subtotal, vaciar } = useCart();
  const { estaLogueado, usuario } = useAuth();
  const navigate = useNavigate();
  const [compraExitosa, setCompraExitosa] = useState(false);

  const [errorCompra, setErrorCompra] = useState('');
  const [procesando, setProcesando] = useState(false);

  // Registra una venta en el backend (POST /api/ventas) por cada producto del carrito.
  const pagar = async ({ cupon = '', porcentaje = 0 } = {}) => {
    if (!estaLogueado) return navigate('/login', { state: { from: '/carrito' } });
    setErrorCompra('');
    setProcesando(true);
    try {
      for (const item of carrito) {
        const total = Math.max(1, calcularTotal(item.precio * item.cantidad, porcentaje));
        await VentasService.createVenta(ventaHaciaApi({ clienteId: usuario.id, item, total, cupon }));
      }
      vaciar();
      setCompraExitosa(true);
    } catch (e) {
      setErrorCompra(mensajeDeError(e, 'No se pudo registrar la compra.'));
    } finally {
      setProcesando(false);
    }
  };

  return (
    <Seccion id="carrito-titulo" eyebrow="Revisa antes de pagar" titulo="Mi carrito de compras" h1 clase="carrito-compras">
      {errorCompra && <Alert variant="danger">{errorCompra}</Alert>}
      {compraExitosa && <p className="mensaje-exito" role="status">¡Compra realizada con éxito! Gracias por preferir Sonido Vivo.</p>}

      {carrito.length > 0 ? (
        <div className="carrito-compras__grid">
          <div className="carrito-compras__lista">
            {carrito.map((item) => (
              <ItemCarrito key={item.id} item={item} onCambiar={cambiar} onEliminar={eliminar} />
            ))}
          </div>
          <ResumenCarrito subtotal={subtotal} onPagar={pagar} deshabilitado={procesando} />
        </div>
      ) : (
        <div className="carrito-vacio">
          <p>Tu carrito está vacío.</p>
          <Link to="/productos" className="boton boton--principal">Ver productos</Link>
        </div>
      )}
    </Seccion>
  );
}

export default Carrito;